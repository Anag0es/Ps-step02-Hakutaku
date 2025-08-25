import { Document } from '../types'

interface DocumentCardProps {
	document: Document
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
	}

	const getCategoryColor = (category: string) => {
		if (category === 'docs') return '#4CAF50'
		if (category === 'wiki') return '#2196F3'
		if (category === 'api') return '#FF9800'
		return '#666'
	}

	return (
		<div
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
				<h3 style={{ margin: '0', color: '#333' }}>{document.title}</h3>
				<span
					style={{
						padding: '4px 8px',
						borderRadius: '4px',
						backgroundColor: getCategoryColor(document.category),
						color: 'white',
						fontSize: '12px',
						fontWeight: 'bold',
					}}
				>
					{document.category.toUpperCase()}
				</span>
			</div>

			<p style={{ color: '#666', marginBottom: '15px' }}>{document.content}</p>

			<div style={{ marginBottom: '10px' }}>
				{document.tags.map((tag) => (
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
					Por: <strong>{document.author}</strong>
				</span>
				<span>{formatDate(document.createdAt)}</span>
			</div>
		</div>
	)
}
