import { useState, useEffect, useMemo } from 'react'
import { Document, SortOption } from '../types'

interface UseFiltersProps {
	documents: Document[]
}

export const useFilters = ({ documents }: UseFiltersProps) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<SortOption>('title')

	const filteredDocs = useMemo(() => {
		let filtered = documents

		if (searchTerm.trim() !== '') {
			filtered = filtered.filter(
				(doc) =>
					doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
					doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
			)
		}

		if (selectedCategory !== 'all') {
			filtered = filtered.filter((doc) => doc.category === selectedCategory)
		}

		if (selectedTags.length > 0) {
			filtered = filtered.filter((doc) => selectedTags.some((tag) => doc.tags.includes(tag)))
		}

		if (sortBy === 'title') {
			filtered.sort((a, b) => a.title.localeCompare(b.title))
		} else if (sortBy === 'date') {
			filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		} else if (sortBy === 'author') {
			filtered.sort((a, b) => a.author.localeCompare(b.author))
		}

		return filtered
	}, [documents, searchTerm, selectedCategory, selectedTags, sortBy])

	const handleSearch = (value: string) => {
		setSearchTerm(value)
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
	}

	const handleTagToggle = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag))
		} else {
			setSelectedTags([...selectedTags, tag])
		}
	}

	const handleSortChange = (sort: SortOption) => {
		setSortBy(sort)
	}

	return {
		searchTerm,
		selectedCategory,
		selectedTags,
		sortBy,
		filteredDocs,
		handleSearch,
		handleCategoryChange,
		handleTagToggle,
		handleSortChange,
	}
}
