import { urlCreator } from '@/lib/utils'
import { useState } from 'react'

export function useSignIn() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const signIn = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(urlCreator('auth/sign-in'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Invalid email or password.')
			}
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