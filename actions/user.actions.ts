import { useState, useEffect } from 'react'
import { urlCreator } from '@/lib/utils'

type useUserDataResponse = {
	id: string
	name: string | null
	username: string | null
	email: string
	avatar: string | null
	createdAt: string
	updatedAt: string
	isThisMe: boolean
	authorized: boolean
}

export function useUserData(userId: string) {
	const [userData, setUserData] = useState<useUserDataResponse | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		if (!userId) return

		async function fetchUserProfile() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch(urlCreator('users/' + userId), {
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				})
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to fetch user profile')
				}
				const data: useUserDataResponse = await response.json()
				setUserData(data)
			} catch (error) {
				console.error('Error in useUserProfile:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUserProfile()
	}, [userId])

	return { userData, isLoading, isError } as const
}