import { urlCreator } from '@/lib/utils'
import { useState, useEffect } from 'react'

type CategoryType = {
	id: string
	name: string
}

export const useCategories = () => {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<Array<CategoryType>>([])

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const response = await fetch(urlCreator('/api/categories/get-all'), {
					cache: 'force-cache'
				})
				if (!response.ok) {
					throw new Error(`Error fetching categories: ${response.statusText}`)
				}
				const data: { categories: Array<CategoryType> } = await response.json()
				setData(data.categories)
			} catch (err: any) {
				setError(err.message || 'An error occurred')
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return {
		error,
		isLoading,
		categories: data,
	} as const
}
