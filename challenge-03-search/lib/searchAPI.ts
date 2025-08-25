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

export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
	if (!query.trim()) {
		return []
	}

	// PROBLEMA 1: Só faz includes(), sem algoritmo de relevância
	const filtered = mockResults.filter((result) => {
		const searchTerm = query.toLowerCase()
		return (
			result.title.toLowerCase().includes(searchTerm) ||
			result.content.toLowerCase().includes(searchTerm) ||
			result.snippet.toLowerCase().includes(searchTerm) ||
			result.category.toLowerCase().includes(searchTerm) ||
			result.author?.toLowerCase().includes(searchTerm)
		)
	})

	// PROBLEMA 2: Score sempre 0, não calcula relevância real
	const sorted = filtered.sort((a, b) => b.score - a.score).slice(0, limit)

	return sorted
}

// SUAS TAREFAS:
// Calcular score baseado em frequência do termo
// Título 3x mais relevante que conteúdo
// Normalizar acentos: "nao" encontra "não"
// Fuzzy matching: "buca" encontra "busca"
// Performance para grandes volumes, quais estratégias?
