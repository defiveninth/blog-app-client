"use client"
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardFooter } from "@/components/ui/card"
import { useCreateAccount } from '@/actions/auth.actions'

export default function SignUpForm() {
  const router = useRouter()
  const { createAccount, isLoading } = useCreateAccount()
  const [email, setEmail] = useState<string>('')

  return (
    <form className="space-y-4" onSubmit={e => {
      e.preventDefault()
      createAccount(email)
    }}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="name@example.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className='animate-spin' /> : 'Sign Up'}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" className="w-full" type="button">
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign up with Google
      </Button>
      <CardFooter className="px-0 pt-4">
        <div className="text-center w-full">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="p-0 h-auto font-normal" type='button' onClick={() => router.push("/auth/sign-in")}>
              Sign in
            </Button>
          </p>
        </div>
      </CardFooter>
    </form>
  )
}

