import { Header } from '@/components/common/header'

import PublicDataSettings from '@/components/settings/public-settings'
// import ChangePasswordForm from '@/components/settings/password-settings'

export default function SettingsPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto w-full max-w-[1080px] pb-10 flex flex-col gap-5 pt-5">
				<PublicDataSettings />
				{/* <ChangePasswordForm /> */}
			</div>
		</>
	)
}