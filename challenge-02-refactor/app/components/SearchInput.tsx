interface SearchInputProps {
	value: string
	onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
	return (
		<div>
			<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Buscar:</label>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Digite para buscar..."
				style={{
					padding: '8px 12px',
					border: '1px solid #ddd',
					borderRadius: '4px',
					width: '250px',
				}}
			/>
		</div>
	)
}
