import Link from 'next/link'

export default function Home() {
  return (
    <header className='flex justify-center px-5'>
      <div className='container py-5 flex justify-between'>
        <Link href={'/'} className='font-semibold text-xl'>
          QulaQqUp
        </Link>
        <div>
          <Link href={'/home'}>Home</Link>
          <Link href={''}>Popular</Link>
          <Link href={''}></Link>
          <Link href={''}></Link>
        </div>
      </div>
    </header>
  )
}
