interface CategorySelectProps {
	value: string
	onChange: (category: string) => void
}

export const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
	return (
		<div>
			<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Categoria:</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
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
	)
}
