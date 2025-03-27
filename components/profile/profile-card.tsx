'use client'

import { useParams, useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { useUserData } from '@/actions/user.actions'
import { formatDate } from '@/lib/utils'

export default function UserProfile() {
	const { id } = useParams()
	const router = useRouter()
	const { userData, isLoading, isError } = useUserData(id as string)

	if (isLoading) {
		return (
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<Skeleton className="h-8 w-[250px]" />
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[150px]" />
							<Skeleton className="h-4 w-[150px]" />
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (!userData) {
		return (
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<CardTitle>User Not Found</CardTitle>
					</CardHeader>
					<CardContent>
						<p>The requested user profile could not be found.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-red-500">Error</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Failed to load user profile. Please try again later.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	const handleSettingsClick = () => {
		router.push('/settings')
	}

	const handleReportClick = () => {
		// Placeholder action for reporting
		alert('Report functionality will be implemented soon.')
	}

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader className="flex flex-row items-center gap-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={userData.avatar || undefined} alt={userData.name || userData.username || 'User avatar'} />
						<AvatarFallback>{userData.name?.[0] || userData.username?.[0] || 'U'}</AvatarFallback>
					</Avatar>
					<div className="flex-grow">
						<CardTitle>{userData.name || userData.username || 'Anonymous User'}</CardTitle>
						{userData.username && <p className="text-sm text-muted-foreground">@{userData.username}</p>}
					</div>

				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<p><strong>Email:</strong> <a href={`mailto:${userData.email}`} className='hover:underline hover:text-blue-600 text-blue-500'>{userData.email}</a></p>
						<p><strong>Since:</strong> {formatDate(userData.createdAt)}</p>
					</div>
					<div className='mt-3'>
						{userData.isThisMe ? (
							<Button onClick={handleSettingsClick} className='min-w-32'>Settings</Button>
						) : (
							<Button variant="outline" onClick={handleReportClick} className='min-w-32'>Report</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
