export type Document = {
	id: string
	title: string
	content: string
	category: 'docs' | 'wiki' | 'api'
	tags: string[]
	createdAt: string
	author: string
}

export type SortOption = 'title' | 'date' | 'author'
