import { urlCreator } from '@/lib/utils'
import { useEffect, useState } from 'react'

type Category = {
	id: number
	name: string
	postsCount: number
	viewCount: number
}

export const useCategories = () => {
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setIsLoading(true)
				setIsError(false)

				const res = await fetch(urlCreator('categories'), {
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
				})

				if (!res.ok) {
					const errorData = await res.json()
					throw new Error(errorData?.error || 'Failed to fetch categories')
				}

				const data = await res.json()
				setCategories(data)
			} catch (err) {
				console.error('Error in useCategories:', err)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return { categories, isLoading, isError } as const
}
