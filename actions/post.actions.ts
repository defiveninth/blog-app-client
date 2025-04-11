import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Post } from '@/types/post'
import { urlCreator } from '@/lib/utils'

type PostData = {
	title: string
	content: string
	published: boolean
	category: string
}

type UseCreatePostReturn = {
	isLoading: boolean
	error: string | null
	createPost: (postData: PostData) => Promise<void>
}

export function useCreatePost(): UseCreatePostReturn {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const createPost = async (postData: PostData) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(urlCreator('posts'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(postData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to create post.')
			}

			const data = await response.json()
			router.push(`/posts/${data.postId}`)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, error, createPost }
}

export function usePosts() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch(urlCreator('posts'), {
					credentials: 'include'
				})
				if (!response.ok) {
					throw new Error('Failed to fetch posts.')
				}
				const data: Post[] = await response.json()
				setPosts(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	return { posts, loading, error }
}

export function useRemovePost() {
	const [isRemoving, setIsRemoving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const removePost = useCallback(async (postId: string) => {
		setIsRemoving(true)
		setError(null)

		try {
			const response = await fetch(urlCreator('posts'), {
				method: 'DELETE',
				body: JSON.stringify({ id: postId }),
				credentials: 'include'
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to remove the post')
			}

			return true
		} catch (err) {
			console.error('Error removing post:', err)
			setError(err instanceof Error ? err.message : 'An unknown error occurred')
			return false
		} finally {
			setIsRemoving(false)
		}
	}, [])

	return {
		removePost,
		isRemoving,
		error,
	}
}
