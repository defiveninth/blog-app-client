import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VerifyAccountForm from '@/components/forms/verify-account.form'

export default function VerifyAccount() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Verify Your Account</CardTitle>
					<CardDescription className="text-center">
						Please enter your name and create a password to complete your account verification
					</CardDescription>
				</CardHeader>
				<CardContent>
					<VerifyAccountForm />
				</CardContent>
			</Card>
		</div>
	)
}
