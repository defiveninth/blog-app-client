"use client"

import type React from "react"
import { Lock, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActivateAccount } from '@/actions/auth.actions'

export default function ActivateAccountForm() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [verifyPassword, setVerifyPassword] = useState("")
	const [localError, setLocalError] = useState("")

	const { activateAccount, error: activatingError, isLoading } = useActivateAccount()

	const verifyToken = searchParams.get('verifytoken') ?? ""

	useEffect(() => {
		if (!verifyToken) {
			router.replace('/auth/sign-up')
		}
	}, [verifyToken, router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLocalError("")

		if (password !== verifyPassword) {
			setLocalError("Passwords do not match")
			return
		}

		await activateAccount(verifyToken, name, password)
	}

	const errorMessage = localError || activatingError

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Name</Label>
				<div className="relative">
					<User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="name"
						type="text"
						placeholder="John Doe"
						className="pl-10"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="password"
						type="password"
						className="pl-10"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="verify-password">Verify Password</Label>
				<div className="relative">
					<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="verify-password"
						type="password"
						className="pl-10"
						value={verifyPassword}
						onChange={(e) => setVerifyPassword(e.target.value)}
						required
					/>
				</div>
			</div>
			{errorMessage && (
				<Alert variant="destructive">
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			)}
			<Button className="w-full" type="submit" disabled={isLoading}>
				{isLoading ? "Verifying..." : "Verify Account"}
			</Button>
			<CardFooter className="px-0 pt-4">
				<div className="text-center w-full">
					<p className="text-sm text-muted-foreground">
						By verifying your account, you agree to our{" "}
						<Button variant="link" className="p-0 h-auto font-normal" onClick={() => router.push("/terms")}>
							Terms of Service
						</Button>{" "}
						and{" "}
						<Button variant="link" className="p-0 h-auto font-normal" onClick={() => router.push("/privacy")}>
							Privacy Policy
						</Button>
					</p>
				</div>
			</CardFooter>
		</form>
	)
}
