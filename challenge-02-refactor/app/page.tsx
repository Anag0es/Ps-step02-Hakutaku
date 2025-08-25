'use client'

import { useDocuments } from './hooks/useDocuments'
import { useFilters } from './hooks/useFilters'
import { DocumentCard } from './components/DocumentCard'
import { SearchInput } from './components/SearchInput'
import { CategorySelect } from './components/CategorySelect'
import { SortSelect } from './components/SortSelect'
import { TagFilter } from './components/TagFilter'

export default function KnowledgeBase() {
	const { documents, loading, getAllTags } = useDocuments()
	const {
		searchTerm,
		selectedCategory,
		selectedTags,
		sortBy,
		filteredDocs,
		handleSearch,
		handleCategoryChange,
		handleTagToggle,
		handleSortChange,
	} = useFilters({ documents })

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
				<SearchInput value={searchTerm} onChange={handleSearch} />
				<CategorySelect value={selectedCategory} onChange={handleCategoryChange} />
				<SortSelect value={sortBy} onChange={handleSortChange} />
			</div>

			<TagFilter
				availableTags={getAllTags()}
				selectedTags={selectedTags}
				onTagToggle={handleTagToggle}
			/>

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
					<DocumentCard key={doc.id} document={doc} />
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
