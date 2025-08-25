export type User = {
	id: number
	name: string
	email: string
	role: string
	department: string
	isOnline: boolean
	lastActivity: string
}

export type ApiResponse = {
	users: User[]
	total: number
}

export type UserStatus = 'online' | 'offline' | 'away'
