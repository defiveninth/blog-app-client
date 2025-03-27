import { Header } from '@/components/common/header'
import UserProfile from '@/components/profile/profile-card'
// import UserPosts from '@/components/profile/user-posts'

export default function UserProfilePage() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-[1080px] pb-10">
				<UserProfile />
				{/* <UserPosts /> */}
			</div>
		</>
	)
}