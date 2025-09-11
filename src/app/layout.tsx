import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '../context/LanguageContext'
import '../styles/globals.css'
import LayoutWrapper from '../components/LayoutWrapper'
import localFont from 'next/font/local'
import { cookies } from 'next/headers';

const myFont = localFont({
	src: '../../public/Fonts/Inter-VariableFont_opsz,wght.ttf',
})

export const metadata = {
	title: 'DataFlow - Client Management Solution',
	description: 'Client management and money calculation system',
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: '/favicons/apple-touch-icon.png',
		other: [
			{
				rel: 'icon',
				url: '/favicons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				rel: 'icon',
				url: '/favicons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	},
	manifest: '/favicons/site.webmanifest',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const lang = (cookieStore.get('language')?.value as 'en' | 'fr') || 'fr';
	return (
		<html lang={lang} className={myFont.className}>
			<body>
				<LanguageProvider initialLanguage={lang}>
					<Toaster position="top-right" containerStyle={{ top: 80 }} />
					<LayoutWrapper>
						{children}
					</LayoutWrapper>
				</LanguageProvider>
			</body>
		</html>
	)
}