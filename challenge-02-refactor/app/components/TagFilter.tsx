interface TagFilterProps {
	availableTags: string[]
	selectedTags: string[]
	onTagToggle: (tag: string) => void
}

export const TagFilter = ({ availableTags, selectedTags, onTagToggle }: TagFilterProps) => {
	return (
		<div style={{ marginBottom: '20px' }}>
			<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Tags:</label>
			<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
				{availableTags.map((tag) => (
					<button
						key={tag}
						onClick={() => onTagToggle(tag)}
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
	)
}
