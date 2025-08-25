'use client'

import { useState, useEffect } from 'react'

type Document = {
	id: string
	title: string
	content: string
	category: 'docs' | 'wiki' | 'api'
	tags: string[]
	createdAt: string
	author: string
}

export default function KnowledgeBase() {
	const [documents, setDocuments] = useState<Document[]>([])
	const [filteredDocs, setFilteredDocs] = useState<Document[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<string>('title')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchDocuments()
	}, [])

	useEffect(() => {
		filterAndSortDocuments()
	}, [searchTerm, selectedCategory, selectedTags, sortBy, documents])

	const fetchDocuments = async () => {
		setLoading(true)
		const mockDocs: Document[] = [
			{
				id: '1',
				title: 'API Documentation',
				content: 'Complete API reference for Hakutaku platform',
				category: 'api',
				tags: ['api', 'reference', 'backend'],
				createdAt: '2024-01-15',
				author: 'João Silva',
			},
			{
				id: '2',
				title: 'User Guide',
				content: 'How to use Hakutaku knowledge management system',
				category: 'docs',
				tags: ['guide', 'tutorial', 'frontend'],
				createdAt: '2024-01-20',
				author: 'Maria Santos',
			},
			{
				id: '3',
				title: 'Architecture Overview',
				content: 'System architecture and design patterns',
				category: 'wiki',
				tags: ['architecture', 'design', 'system'],
				createdAt: '2024-01-10',
				author: 'Pedro Costa',
			},
		]
		setDocuments(mockDocs)
		setLoading(false)
	}

	const filterAndSortDocuments = () => {
		let filtered = documents

		if (searchTerm.trim() !== '') {
			filtered = filtered.filter(
				(doc) =>
					doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
			)
		}

		if (selectedCategory !== 'all') {
			filtered = filtered.filter((doc) => doc.category === selectedCategory)
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)))
		}

		if (sortBy === 'title') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === 'date') {
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		} else if (sortBy === 'author') {
			filtered.sort((a, b) => a.author.localeCompare(b.author))
		}

		setFilteredDocs(filtered)
	}

	const handleSearch = (value: string) => {
		setSearchTerm(value)
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
	}

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const handleSortChange = (sort: string) => {
		setSortBy(sort)
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	const getAllTags = () => {
		const allTags = documents.flatMap((doc) => doc.tags)
		return [...new Set(allTags)]
	}

	const getCategoryColor = (category: string) => {
		if (category === 'docs') return '#4CAF50'
		if (category === 'wiki') return '#2196F3'
		if (category === 'api') return '#FF9800'
		return '#666'
	}

	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					fontFamily: 'Arial, sans-serif',
				}}
			>
				<div>Carregando base de conhecimento...</div>
			</div>
		)
	}

	return (
		<div
			style={{
				padding: '20px',
				fontFamily: 'Arial, sans-serif',
				maxWidth: '1200px',
				margin: '0 auto',
			}}
		>
			<h1 style={{ marginBottom: '30px', color: '#333' }}>📚 Base de Conhecimento Hakutaku</h1>

			<div
				style={{
					display: 'flex',
					gap: '20px',
					marginBottom: '30px',
					flexWrap: 'wrap',
					alignItems: 'center',
				}}
			>
				<div>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Buscar:</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Digite para buscar..."
						style={{
							padding: '8px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							width: '250px',
						}}
					/>
				</div>

				<div>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Categoria:</label>
					<select
						value={selectedCategory}
						onChange={(e) => handleCategoryChange(e.target.value)}
						style={{
							padding: '8px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
						}}
					>
						<option value="all">Todas</option>
						<option value="docs">Documentação</option>
						<option value="wiki">Wiki</option>
						<option value="api">API</option>
					</select>
				</div>

				<div>
					<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Ordenar por:</label>
					<select
						value={sortBy}
						onChange={(e) => handleSortChange(e.target.value)}
						style={{
							padding: '8px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
						}}
					>
						<option value="title">Título</option>
						<option value="date">Data</option>
						<option value="author">Autor</option>
					</select>
				</div>
			</div>

			<div style={{ marginBottom: '20px' }}>
				<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Tags:</label>
				<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
					{getAllTags().map((tag) => (
						<button
							key={tag}
							onClick={() => handleTagToggle(tag)}
							style={{
								padding: '4px 8px',
								border: selectedTags.includes(tag) ? '2px solid #007bff' : '1px solid #ddd',
								borderRadius: '20px',
								background: selectedTags.includes(tag) ? '#e7f3ff' : 'white',
								cursor: 'pointer',
								fontSize: '12px',
							}}
						>
							{tag}
						</button>
					))}
				</div>
			</div>

			<div style={{ marginBottom: '20px' }}>
				<strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
			</div>

			<div
				style={{
					display: 'grid',
					gap: '20px',
					gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
				}}
			>
				{filteredDocs.map((doc) => (
					<div
						key={doc.id}
						style={{
							border: '1px solid #ddd',
							borderRadius: '8px',
							padding: '20px',
							backgroundColor: '#fafafa',
							transition: 'transform 0.2s',
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
							<h3 style={{ margin: '0', color: '#333' }}>{doc.title}</h3>
							<span
								style={{
									padding: '4px 8px',
									borderRadius: '4px',
									backgroundColor: getCategoryColor(doc.category),
									color: 'white',
									fontSize: '12px',
									fontWeight: 'bold',
								}}
							>
								{doc.category.toUpperCase()}
							</span>
						</div>

						<p style={{ color: '#666', marginBottom: '15px' }}>{doc.content}</p>

						<div style={{ marginBottom: '10px' }}>
							{doc.tags.map((tag) => (
								<span
									key={tag}
									style={{
										display: 'inline-block',
										padding: '2px 6px',
										margin: '2px',
										backgroundColor: '#e0e0e0',
										borderRadius: '12px',
										fontSize: '11px',
										color: '#555',
									}}
								>
									#{tag}
								</span>
							))}
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								fontSize: '12px',
								color: '#888',
							}}
						>
							<span>
								Por: <strong>{doc.author}</strong>
							</span>
							<span>{formatDate(doc.createdAt)}</span>
						</div>
					</div>
				))}
			</div>

			{filteredDocs.length === 0 && (
				<div
					style={{
						textAlign: 'center',
						padding: '40px',
						color: '#666',
					}}
				>
					<h3>Nenhum documento encontrado</h3>
					<p>Tente ajustar os filtros de busca</p>
				</div>
			)}
		</div>
	)
}
