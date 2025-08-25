import { expect } from 'chai'
import { searchKnowledge } from '../lib/searchAPI'

describe('Basic Search functionality', () => {
	it('should return empty array for empty query', async () => {
		const results = await searchKnowledge('')
		expect(results).to.deep.equal([])
	})

	it('should return results for valid query', async () => {
		const results = await searchKnowledge('RAG')
		expect(results.length).to.be.greaterThan(0)
		expect(results[0]).to.have.property('id')
		expect(results[0]).to.have.property('title')
		expect(results[0]).to.have.property('content')
	})

	it('should return results sorted by relevance score', async () => {
		const results = await searchKnowledge('busca')
		const scores = results.map((r) => r.score)
		const sortedScores = [...scores].sort((a, b) => b - a)
		expect(scores).to.deep.equal(sortedScores)
	})

	it('should respect limit parameter', async () => {
		const results = await searchKnowledge('busca', 2)
		expect(results.length).to.be.at.most(2)
	})

	it('should calculate meaningful scores', async () => {
		const results = await searchKnowledge('busca')
		if (results.length > 0) {
			expect(results.some((r) => r.score > 0)).to.equal(true)
		}
	})
})
