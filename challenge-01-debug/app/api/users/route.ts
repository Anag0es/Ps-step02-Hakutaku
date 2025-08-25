import { NextRequest, NextResponse } from 'next/server'

type User = {
	id: number
	name: string
	email: string
	role: string
	department: string
	isOnline: boolean
	lastActivity: string
}

const mockUsers: User[] = [
	{
		id: 1,
		name: 'João Silva',
		email: 'joao@hakutaku.com',
		role: 'Senior Developer',
		department: 'Engineering',
		isOnline: true,
		lastActivity: '2024-01-15T10:30:00Z',
	},
	{
		id: 2,
		name: 'Maria Santos',
		email: 'maria@hakutaku.com',
		role: 'Product Manager',
		department: 'Product',
		isOnline: false,
		lastActivity: '2024-01-15T09:15:00Z',
	},
	{
		id: 3,
		name: 'Pedro Costa',
		email: 'pedro@hakutaku.com',
		role: 'Designer',
		department: 'Design',
		isOnline: true,
		lastActivity: '2024-01-15T10:45:00Z',
	},
	{
		id: 4,
		name: 'Ana Oliveira',
		email: 'ana@hakutaku.com',
		role: 'DevOps Engineer',
		department: 'Engineering',
		isOnline: false,
		lastActivity: '2024-01-14T16:20:00Z',
	},
]

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const department = searchParams.get('department')

	try {
		if (Math.random() < 0.15) {
			return NextResponse.json({ error: 'Internal server error', users: [] }, { status: 200 })
		}

		let filteredUsers = mockUsers

		if (department) {
			filteredUsers = mockUsers.filter((user) => user.department.toLowerCase().includes(department.toLowerCase()))
		}

		const usersWithRandomStatus = filteredUsers.map((user) => ({
			...user,
			isOnline: Math.random() > 0.4,
			lastActivity: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
		}))

		return NextResponse.json({
			users: usersWithRandomStatus,
			total: usersWithRandomStatus.length,
			timestamp: new Date().toISOString(),
		})
	} catch (error) {
		console.log('Some error happened')
		return NextResponse.json({ error: 'Something went wrong' }, { status: 200 })
	}
}

export async function OPTIONS(request: NextRequest) {
	return new NextResponse(null, {
		status: 200,
		headers: {
			'Access-Control-Allow-Origin': 'http://localhost:3000',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		},
	})
}
