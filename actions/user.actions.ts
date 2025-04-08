import { useState, useEffect, useCallback } from 'react'
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

type UsernameCheckResult = {
	isAvailable: boolean
	error?: string
}

export function useCheckUsername() {
	const [isLoading, setIsLoading] = useState(false)
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
	const [error, setError] = useState<string | null>(null)

	const check = useCallback(async (username: string): Promise<UsernameCheckResult> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(urlCreator(`settings/username-availability?username=${encodeURIComponent(username)}`))
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to check username availability')
			}

			setIsAvailable(data.isAvailable)
			return data
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
			setError(errorMessage)
			setIsAvailable(null)
			return { isAvailable: false, error: errorMessage }
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		isLoading,
		isAvailable,
		error,
		check
	}
}

type UpdateSettingsInput = {
	name: string
	username: string
	email: string
	avatar: string
}

type UpdateSettingsResult = {
	isUpdating: boolean
	updateError: string | null
	updateSuccess: boolean
	updateSettings: (data: UpdateSettingsInput) => Promise<void>
}

export function useUpdateSettings(): UpdateSettingsResult {
	const [isUpdating, setIsUpdating] = useState(false)
	const [updateError, setUpdateError] = useState<string | null>(null)
	const [updateSuccess, setUpdateSuccess] = useState(false)

	const updateSettings = async (data: UpdateSettingsInput) => {
		setIsUpdating(true)
		setUpdateError(null)
		setUpdateSuccess(false)

		try {
			const response = await fetch(urlCreator('settings'), {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to update settings')
			}

			setUpdateSuccess(true)
		} catch (error) {
			setUpdateError(error instanceof Error ? error.message : 'An unknown error occurred')
		} finally {
			setIsUpdating(false)
		}
	}

	return {
		isUpdating,
		updateError,
		updateSuccess,
		updateSettings,
	}
}

type UserPublicSettings = {
	id: string
	name: string | null
	username: string | null
	email: string
	avatar: string | null
	createdAt: string
	updatedAt: string
	isThisMe: boolean
}

export function useMyPublicSettings() {
	const [user, setUser] = useState<UserPublicSettings | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		async function fetchMyPublicSettings() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch(urlCreator('settings'), {
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				})
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to fetch user profile')
				}
				const data: UserPublicSettings = await response.json()
				setUser(data)
			} catch (error) {
				console.error('Error in useUserProfile:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMyPublicSettings()
	}, [])

	return {
		settings: user,
		isLoading,
		isError
	} as const
}

interface ChangePasswordResponse {
	message?: string
	error?: string
}

export const useChangePassword = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	const changePassword = async (oldPassword: string, newPassword: string) => {
		setLoading(true)
		setError(null)
		setMessage(null)

		try {
			const response = await fetch(urlCreator('settings/set-password'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ oldPassword, newPassword }),
				credentials: 'include'
			})

			const data: ChangePasswordResponse = await response.json()

			if (!response.ok) {
				setError(data.error || 'Something went wrong.')
			} else {
				setMessage(data.message || 'Password changed successfully.')
			}
		} catch (error) {
			setError('Failed to change password. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, message, changePassword } as const
}