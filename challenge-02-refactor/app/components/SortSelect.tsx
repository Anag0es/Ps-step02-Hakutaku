import { SortOption } from '../types'

interface SortSelectProps {
	value: SortOption
	onChange: (sort: SortOption) => void
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
	return (
		<div>
			<label style={{ marginRight: '10px', fontWeight: 'bold' }}>Ordenar por:</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value as SortOption)}
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
	)
}
