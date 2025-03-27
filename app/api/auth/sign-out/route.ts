import { cookies } from 'next/headers'

export async function GET() {
	const cookieStore = await cookies()

	cookieStore.delete('authToken')

	return new Response(null, {
		status: 307,
		headers: {
			Location: '/auth/sign-in'
		}
	})
}