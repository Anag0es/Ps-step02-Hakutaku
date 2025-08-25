'use client'

import { useState } from 'react'
import { SearchResult, searchKnowledge } from '../lib/searchAPI'

export default function SearchPage() {
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<SearchResult[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasSearched, setHasSearched] = useState(false)

	const handleSearch = async (searchTerm: string) => {
		setIsLoading(true)
		setHasSearched(true)

		try {
			const searchResults = await searchKnowledge(searchTerm)
			setResults(searchResults)
		} catch (error) {
			console.error('Erro na busca:', error)
			setResults([])
		} finally {
			setIsLoading(false)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setQuery(value)

		handleSearch(value)
	}

	const getCategoryIcon = (category: SearchResult['category']) => {
		const icons = {
			documentation: '📄',
			api: '🔧',
			wiki: '📚',
			slack: '💬',
			email: '📧',
		}
		return icons[category] || '📄'
	}

	const getCategoryColor = (category: SearchResult['category']) => {
		const colors = {
			documentation: '#4CAF50',
			api: '#FF9800',
			wiki: '#2196F3',
			slack: '#9C27B0',
			email: '#F44336',
		}
		return colors[category] || '#666'
	}

	const formatTimestamp = (timestamp: string) => {
		return new Date(timestamp).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	return (
		<div
			style={{
				maxWidth: '800px',
				margin: '0 auto',
				padding: '40px 20px',
				fontFamily: 'Arial, sans-serif',
			}}
		>
			<div style={{ textAlign: 'center', marginBottom: '40px' }}>
				<h1 style={{ color: '#333', marginBottom: '10px' }}>🔍 Hakutaku Search</h1>
				<p style={{ color: '#666' }}>Busque em toda a base de conhecimento da empresa</p>
			</div>

			<div style={{ marginBottom: '30px' }}>
				<div style={{ position: 'relative' }}>
					<input
						type="text"
						value={query}
						onChange={handleInputChange}
						placeholder="Digite sua busca... (ex: 'busca semântica', 'GraphQL', 'integração')"
						style={{
							width: '100%',
							padding: '15px 20px',
							fontSize: '16px',
							border: '2px solid #ddd',
							borderRadius: '25px',
							outline: 'none',
							transition: 'border-color 0.3s',
							boxSizing: 'border-box',
						}}
						onFocus={(e) => {
							e.target.style.borderColor = '#007bff'
						}}
						onBlur={(e) => {
							e.target.style.borderColor = '#ddd'
						}}
					/>

					{isLoading && (
						<div
							style={{
								position: 'absolute',
								right: '20px',
								top: '50%',
								transform: 'translateY(-50%)',
								color: '#666',
							}}
						>
							Buscando...
						</div>
					)}
				</div>
			</div>

			{hasSearched && (
				<div style={{ marginBottom: '20px', color: '#666' }}>
					{results.length > 0 ? (
						<span>{results.length} resultado(s) encontrado(s)</span>
					) : !isLoading ? (
						<span>Nenhum resultado encontrado</span>
					) : null}
				</div>
			)}

			<div>
				{results.map((result) => (
					<div
						key={result.id}
						style={{
							border: '1px solid #eee',
							borderRadius: '8px',
							padding: '20px',
							marginBottom: '15px',
							backgroundColor: '#fafafa',
							transition: 'transform 0.2s, box-shadow 0.2s',
							cursor: 'pointer',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'translateY(-2px)'
							e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'translateY(0)'
							e.currentTarget.style.boxShadow = 'none'
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								marginBottom: '10px',
							}}
						>
							<h3
								style={{
									margin: '0',
									color: '#333',
									fontSize: '18px',
								}}
							>
								{getCategoryIcon(result.category)} {result.title}
							</h3>
							<span
								style={{
									padding: '4px 8px',
									borderRadius: '4px',
									backgroundColor: getCategoryColor(result.category),
									color: 'white',
									fontSize: '12px',
									fontWeight: 'bold',
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								{result.category}
							</span>
						</div>

						<p
							style={{
								color: '#666',
								marginBottom: '15px',
								lineHeight: '1.5',
							}}
						>
							{result.snippet}
						</p>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								fontSize: '13px',
								color: '#888',
							}}
						>
							<div>
								<span style={{ marginRight: '15px' }}>📁 {result.source}</span>
								{result.author && <span>👤 {result.author}</span>}
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
								<span
									style={{
										padding: '2px 6px',
										backgroundColor: '#e8f5e8',
										color: '#2e7d32',
										borderRadius: '4px',
										fontWeight: 'bold',
									}}
								>
									{Math.round(result.score * 100)}% match
								</span>
								<span>📅 {formatTimestamp(result.timestamp)}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{!hasSearched && (
				<div
					style={{
						textAlign: 'center',
						padding: '60px 20px',
						color: '#999',
					}}
				>
					<div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
					<h3>Comece sua busca</h3>
					<p>Digite qualquer termo para encontrar informações na base de conhecimento</p>

					<div
						style={{
							marginTop: '30px',
							display: 'flex',
							justifyContent: 'center',
							flexWrap: 'wrap',
							gap: '10px',
						}}
					>
						<span style={{ fontSize: '12px', color: '#ccc' }}>Sugestões: </span>
						{['busca semântica', 'GraphQL', 'RAG', 'integração'].map((term) => (
							<button
								key={term}
								onClick={() => {
									setQuery(term)
									handleSearch(term)
								}}
								style={{
									padding: '4px 8px',
									border: '1px solid #ddd',
									borderRadius: '15px',
									background: 'white',
									cursor: 'pointer',
									fontSize: '12px',
									color: '#666',
								}}
							>
								{term}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
