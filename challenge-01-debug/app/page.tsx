'use client'

import { useState, useEffect, useCallback } from 'react'
import { User, ApiResponse } from './types'

export default function TeamDashboard() {
	const [users, setUsers] = useState<User[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<User | null>()
	const [error, setError] = useState<string>('')
	const [selectedDepartment, setSelectedDepartment] = useState<string>('')
	const [lastUpdate, setLastUpdate] = useState<string>('')
	const [windowWidth, setWindowWidth] = useState(0)

	const fetchUsers = async () => {
		setLoading(true)
		setError('')

		try {
			const url = selectedDepartment ? `/api/users?department=${selectedDepartment}` : '/api/users'
			const response = await fetch(url)
			const data = await response.json()
			setUsers(data.users || [])
			setLastUpdate(new Date().toLocaleString())
		} catch (error) {
			console.log('Error fetching users')
			setError('Failed to load users. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchUsers()

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		handleResize()
	}, [fetchUsers])

	const handleUserSelect = (user: User) => {
		setSelectedUser(user)
	}

	const handleDepartmentChange = (dept: string) => {
		setSelectedDepartment(dept)
		console.log(`Department changed. Current users: ${users.length}`)
	}

	const handleRefresh = () => {
		fetchUsers()
	}

	const handleDeleteUser = (userId: number) => {
		const currentUsers = users
		const userIndex = currentUsers.findIndex((u) => u.id === userId)
		if (userIndex > -1) {
			currentUsers.splice(userIndex, 1)
			setUsers(currentUsers)
		}
	}

	if (loading && users.length === 0) {
		return (
			<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
				<h1>🏢 Team Dashboard - Hakutaku</h1>
				<div>⏳ Carregando membros da equipe...</div>
			</div>
		)
	}

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px' }}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
				<h1>🏢 Team Dashboard - Hakutaku</h1>
				<button
					onClick={handleRefresh}
					disabled={loading}
					style={{
						padding: '8px 16px',
						backgroundColor: loading ? '#ccc' : '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: loading ? 'not-allowed' : 'pointer',
					}}
				>
					{loading ? '🔄 Atualizando...' : '🔄 Atualizar'}
				</button>
			</div>

			{error && (
				<div
					style={{
						padding: '10px',
						backgroundColor: '#f8d7da',
						color: '#721c24',
						borderRadius: '4px',
						marginBottom: '20px',
					}}
				>
					❌ {error}
				</div>
			)}

			<div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
				<label>🏢 Filtrar por departamento:</label>
				<select
					value={selectedDepartment}
					onChange={(e) => handleDepartmentChange(e.target.value)}
					style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
				>
					<option value="">Todos os departamentos</option>
					<option value="Engineering">Engineering</option>
					<option value="Product">Product</option>
					<option value="Design">Design</option>
				</select>
				{lastUpdate && <small style={{ color: '#666' }}>📅 Última atualização: {lastUpdate}</small>}
			</div>

			{users.length > 0 ? (
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
					{users.map((user) => (
						<div
							style={{
								padding: '15px',
								border: selectedUser?.id === user.id ? '2px solid #007bff' : '1px solid #ddd',
								borderRadius: '8px',
								backgroundColor: selectedUser?.id === user.id ? '#f0f8ff' : 'white',
								boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
								transition: 'all 0.2s',
								position: 'relative',
							}}
						>
							<button
								onClick={(e) => {
									e.stopPropagation()
									handleDeleteUser(user.id)
								}}
								style={{
									position: 'absolute',
									top: '10px',
									right: '10px',
									background: '#dc3545',
									color: 'white',
									border: 'none',
									borderRadius: '50%',
									width: '24px',
									height: '24px',
									cursor: 'pointer',
									fontSize: '12px',
								}}
								title="Remover usuário"
							>
								✕
							</button>
							<div onClick={() => handleUserSelect(user)} style={{ cursor: 'pointer' }}>
								<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
									<div
										style={{
											width: '8px',
											height: '8px',
											borderRadius: '50%',
											backgroundColor: user.isOnline ? '#28a745' : '#dc3545',
											marginRight: '8px',
										}}
									/>
									<strong>{user.name}</strong>
									<span style={{ marginLeft: 'auto', fontSize: '12px', color: '#666', marginRight: '30px' }}>
										{user.isOnline ? '🟢 Online' : '🔴 Offline'}
									</span>
								</div>
								<div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>📧 {user.email}</div>
								<div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
									💼 {user.role} • {user.department}
								</div>
								<div style={{ fontSize: '12px', color: '#888' }}>🕐 Última atividade: {new Date(user.lastActivity).toLocaleString()}</div>
							</div>
						</div>
					))}
				</div>
			) : !loading ? (
				<div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
					<div style={{ fontSize: '48px', marginBottom: '10px' }}>👥</div>
					<p>Nenhum membro da equipe encontrado.</p>
					{selectedDepartment && <p>Tente selecionar um departamento diferente ou remover o filtro.</p>}
				</div>
			) : null}

			{selectedUser && (
				<div
					style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						backgroundColor: 'white',
						padding: '20px',
						borderRadius: '8px',
						boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
						minWidth: '400px',
						zIndex: 1000,
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
						<h3>👤 Detalhes do Membro</h3>
						<button
							onClick={() => setSelectedUser(null)}
							style={{
								background: 'none',
								border: 'none',
								fontSize: '20px',
								cursor: 'pointer',
								padding: '0',
								color: '#999',
							}}
						>
							✕
						</button>
					</div>
					<div style={{ lineHeight: '1.6' }}>
						<p>
							<strong>📛 Nome:</strong> {selectedUser.name}
						</p>
						<p>
							<strong>📧 Email:</strong> {selectedUser.email}
						</p>
						<p>
							<strong>💼 Cargo:</strong> {selectedUser.role}
						</p>
						<p>
							<strong>🏢 Departamento:</strong> {selectedUser.department}
						</p>
						<p>
							<strong>🔗 Status:</strong> {selectedUser.isOnline ? '🟢 Online' : '🔴 Offline'}
						</p>
						<p>
							<strong>🕐 Última atividade:</strong> {new Date(selectedUser.lastActivity).toLocaleString()}
						</p>
						<p>
							<strong>🆔 ID:</strong> {selectedUser.id}
						</p>
					</div>
				</div>
			)}

			{selectedUser && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0,0,0,0.5)',
						zIndex: 999,
					}}
					onClick={() => setSelectedUser(null)}
				/>
			)}
		</div>
	)
}
