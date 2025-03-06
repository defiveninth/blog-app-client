"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyAccountForm() {
	const router = useRouter()
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [verifyPassword, setVerifyPassword] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setError("")

		if (password !== verifyPassword) {
			setError("Passwords do not match")
			return
		}
		router.push("/dashboard")
	}

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
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Button className="w-full" type="submit">
				Verify Account
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

