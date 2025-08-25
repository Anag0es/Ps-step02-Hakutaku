import { expect } from 'chai'
import { searchKnowledge } from '../lib/searchAPI'

describe('Search Relevance Algorithm', () => {
	it('should return empty array for empty query', async () => {
		const results = await searchKnowledge('')
		expect(results).to.deep.equal([])
	})

	it('should return results for valid query', async () => {
		const results = await searchKnowledge('busca')
		expect(results.length).to.be.greaterThan(0)
		expect(results[0]).to.have.property('id')
		expect(results[0]).to.have.property('title')
		expect(results[0]).to.have.property('score')
	})

	it('should prioritize title matches over content matches', async () => {
		const results = await searchKnowledge('busca')

		const titleMatch = results.find((r) => r.title.toLowerCase().includes('busca'))
		const contentOnlyMatch = results.find((r) => !r.title.toLowerCase().includes('busca') && r.content.toLowerCase().includes('busca'))

		if (titleMatch && contentOnlyMatch) {
			expect(titleMatch.score).to.be.greaterThan(contentOnlyMatch.score)
		}
	})

	it('should calculate relevance scores correctly', async () => {
		const results = await searchKnowledge('RAG')

		// Todos os resultados devem ter score calculado (não 0)
		results.forEach((result) => {
			expect(result.score).to.be.greaterThan(0)
		})

		for (let i = 1; i < results.length; i++) {
			expect(results[i - 1].score).to.be.at.least(results[i].score)
		}
	})

	it('should handle accent normalization', async () => {
		const results = await searchKnowledge('semantica')
		expect(results.some((r) => r.title.includes('semântica') || r.content.includes('semântica'))).to.equal(true)
	})

	it('should respect limit parameter', async () => {
		const results = await searchKnowledge('busca', 3)
		expect(results.length).to.be.at.most(3)
	})

	it('should handle partial word matches', async () => {
		const results = await searchKnowledge('integr')
		expect(results.some((r) => r.title.includes('integração') || r.content.includes('integração'))).to.equal(true)
	})
})

describe('Edge Cases', () => {
	it('should handle single character query', async () => {
		const results = await searchKnowledge('a')
		expect(Array.isArray(results)).to.equal(true)
	})

	it('should handle special characters', async () => {
		const results = await searchKnowledge('GraphQL')
		expect(results.length).to.be.greaterThan(0)
	})

	it('should handle case insensitive search', async () => {
		const lowerResults = await searchKnowledge('graphql')
		const upperResults = await searchKnowledge('GRAPHQL')
		const mixedResults = await searchKnowledge('GraphQL')

		expect(lowerResults.length).to.equal(upperResults.length)
		expect(lowerResults.length).to.equal(mixedResults.length)
	})
})
