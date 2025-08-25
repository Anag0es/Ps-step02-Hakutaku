import mockData from './mockData.json'

export type SearchResult = {
	id: string
	title: string
	content: string
	category: 'documentation' | 'api' | 'wiki' | 'slack' | 'email'
	source: string
	score: number
	snippet: string
	timestamp: string
	author?: string
}

const mockResults: SearchResult[] = mockData as SearchResult[]

// Calcula distância de Levenshtein
function levenshteinDistance(str1: string, str2: string): number {
	const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))

	for (let i = 0; i <= str1.length; i++) {
		matrix[0][i] = i
	}

	for (let j = 0; j <= str2.length; j++) {
		matrix[j][0] = j
	}

	for (let j = 1; j <= str2.length; j++) {
		for (let i = 1; i <= str1.length; i++) {
			if (str1[i - 1] === str2[j - 1]) {
				matrix[j][i] = matrix[j - 1][i - 1]
			} else {
				matrix[j][i] = Math.min(
					matrix[j - 1][i] + 1,    // deletion
					matrix[j][i - 1] + 1,    // insertion
					matrix[j - 1][i - 1] + 1 // substitution
				)
			}
		}
	}

	return matrix[str2.length][str1.length]
}

// Calcula similaridade fuzzy (0-1, sendo 1 = idêntico)
function fuzzyMatch(query: string, target: string): number {
	if (query === target) return 1
	if (query.length === 0 || target.length === 0) return 0

	const distance = levenshteinDistance(query, target)
	const maxLength = Math.max(query.length, target.length)
	
	return 1 - (distance / maxLength)
}

// Normaliza texto removendo acentos e caracteres especiais
function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
		.replace(/[^\w\s]/g, ' ')        // Remove pontuação
		.replace(/\s+/g, ' ')            // Normaliza espaços
		.trim()
}

// Calcula score de relevância
function calculateRelevanceScore(query: string, result: SearchResult): number {
	const normalizedQuery = normalizeText(query)
	const queryTerms = normalizedQuery.split(' ').filter(term => term.length > 0)
	
	if (queryTerms.length === 0) return 0

	let totalScore = 0
	const weights = {
		title: 3.0,      // Título tem peso 3x
		content: 1.0,    // Conteúdo peso base
		snippet: 1.5,    // Snippet peso 1.5x
		category: 2.0,   // Categoria peso 2x
		author: 1.2      // Autor peso 1.2x
	}

	// Normaliza campos do resultado
	const normalizedTitle = normalizeText(result.title)
	const normalizedContent = normalizeText(result.content)
	const normalizedSnippet = normalizeText(result.snippet)
	const normalizedCategory = normalizeText(result.category)
	const normalizedAuthor = normalizeText(result.author || '')

	// Para cada termo da busca
	for (const term of queryTerms) {
		let termScore = 0

		// Busca exata (maior pontuação)
		if (normalizedTitle.includes(term)) {
			termScore += weights.title * 1.0
		}
		if (normalizedContent.includes(term)) {
			termScore += weights.content * 1.0
		}
		if (normalizedSnippet.includes(term)) {
			termScore += weights.snippet * 1.0
		}
		if (normalizedCategory.includes(term)) {
			termScore += weights.category * 1.0
		}
		if (normalizedAuthor.includes(term)) {
			termScore += weights.author * 1.0
		}

		// Se não houve correspondência exata, tenta fuzzy matching
		if (termScore === 0) {
			// Fuzzy matching para palavras individuais
			const titleWords = normalizedTitle.split(' ')
			const contentWords = normalizedContent.split(' ')
			const snippetWords = normalizedSnippet.split(' ')

			// Fuzzy no título
			for (const word of titleWords) {
				if (word.length >= 3 && term.length >= 3) {
					const similarity = fuzzyMatch(term, word)
					if (similarity >= 0.6) { // Reduzido para 60% para melhor cobertura
						termScore += weights.title * similarity * 0.8
					}
				}
			}

			// Fuzzy no conteúdo
			for (const word of contentWords) {
				if (word.length >= 3 && term.length >= 3) {
					const similarity = fuzzyMatch(term, word)
					if (similarity >= 0.6) {
						termScore += weights.content * similarity * 0.8
					}
				}
			}

			// Fuzzy no snippet
			for (const word of snippetWords) {
				if (word.length >= 3 && term.length >= 3) {
					const similarity = fuzzyMatch(term, word)
					if (similarity >= 0.6) {
						termScore += weights.snippet * similarity * 0.8
					}
				}
			}

			// Fuzzy na categoria
			if (normalizedCategory.length >= 3 && term.length >= 3) {
				const similarity = fuzzyMatch(term, normalizedCategory)
				if (similarity >= 0.6) {
					termScore += weights.category * similarity * 0.8
				}
			}

			// Fuzzy no autor
			const authorWords = normalizedAuthor.split(' ')
			for (const word of authorWords) {
				if (word.length >= 3 && term.length >= 3) {
					const similarity = fuzzyMatch(term, word)
					if (similarity >= 0.6) {
						termScore += weights.author * similarity * 0.8
					}
				}
			}
		}

		totalScore += termScore
	}

	// Normalizar score final (0-1)
	const maxPossibleScore = queryTerms.length * (weights.title + weights.content + weights.snippet + weights.category + weights.author)
	return Math.min(totalScore / maxPossibleScore, 1)
}

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
	if (!query.trim()) {
		return []
	}

	// Calcular scores para todos os resultados
	const resultsWithScores = mockResults.map(result => ({
		...result,
		score: calculateRelevanceScore(query, result)
	}))

	// Filtrar apenas resultados com score > 0 
	const filtered = resultsWithScores.filter(result => result.score > 0)

	// Ordenar por score (maior primeiro) e limitar resultados
	const sorted = filtered
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)

	return sorted
}
