import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ActivateAccountForm from '@/components/forms/activate-account.form'

export default function ActivateAccountPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">Activate Your Account</CardTitle>
					<CardDescription className="text-center">
						Please enter your name and create a password to complete your account activation
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ActivateAccountForm />
				</CardContent>
			</Card>
		</div>
	)
}
