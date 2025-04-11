import Link from 'next/link'
import { CalendarIcon, EyeIcon, UserIcon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from '@/lib/utils'
import { Post } from '@/types/post'

interface PostItemProps {
	post: Post
}

export function PostItem({ post }: PostItemProps) {
	return (
		<Link href={`/posts/${post.id}`} className="block hover:no-underline">
			<Card className="h-full transition-shadow hover:shadow-lg">
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
				</CardHeader>
				<CardContent className='pb-2'>
					<p className="text-muted-foreground mb-4">{post.content.substring(0, 150)}...</p>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-3">
					<div className='flex items-center justify-between w-full'>
						{post.category && (
							<Badge variant="outline" className="mt-2">
								{post.category.name}
							</Badge>
						)}
						<div className="flex items-center">
							<EyeIcon className="mr-1 h-3 w-3" />
							<span>{post.viewCount} views</span>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<Badge key={tag.name} variant="secondary">
								#{tag.name}
							</Badge>
						))}
					</div>
					<div className="flex justify-between w-full items-center space-x-4 text-sm text-muted-foreground">
						<div className="flex items-center">
							<UserIcon className="mr-1 h-3 w-3" />
							<span>{post.author.name}</span>
						</div>
						<div className="flex items-center">
							<CalendarIcon className="mr-1 h-3 w-3" />
							<span>{formatDate(post.createdAt)}</span>
						</div>
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}