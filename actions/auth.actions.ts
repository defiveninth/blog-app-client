import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { urlCreator } from '@/lib/utils'

export function useSignIn() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const signIn = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(urlCreator('auth/sign-in'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
				credentials: 'include'
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Invalid email or password.')
			}
			router.push('/')
			return true
		} catch (err: any) {
			setError(err.message || 'An error occurred during sign-in.')
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		signIn,
	} as const
}

export function useCreateAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const createAccount = async (email: string): Promise<{ success: boolean; error?: string }> => {
		setIsLoading(true)

		try {
			const response = await fetch(urlCreator('auth/sign-up'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong')
			}

			return { success: true }
		} catch (err: any) {
			return { success: false, error: err.message || 'An error occurred' }
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		createAccount,
	} as const
}

export function useActivateAccount() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const activateAccount = async (
		verifyToken: string,
		name: string,
		password: string
	): Promise<boolean> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(urlCreator('auth/verify'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ verifyToken, name, password }),
				credentials: 'include'
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Activation failed. Please try again.')
			}
			router.replace('/')
			return true
		} catch (err: any) {
			setError(err.message || 'An unexpected error occurred.')
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		activateAccount,
	} as const
}

interface UserData {
	id: string
	username: string
	email: string
}

export const useAuth = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string>('')
	const [data, setData] = useState<UserData | null>(null)

	const fetchMyData = async () => {
		setIsLoading(true)
		setError('')
		try {
			const response = await fetch(urlCreator('auth'), {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to fetch user data.')
			}

			const userData: UserData = await response.json()
			setData(userData)
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		void fetchMyData()
	}, [])

	return { isLoading, error, data } as const
}
