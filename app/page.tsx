import { Header } from '@/components/common/header'
import CreatePostForm from '@/components/forms/create-post'
import { PostList } from '@/components/post/post-list'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto w-full max-w-[1080px] pb-10">
        <CreatePostForm />
        <PostList />
      </div>
    </>
  )
}
