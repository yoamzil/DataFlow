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
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = await cookies();
	const lang = (cookieStore.get('language')?.value as 'en' | 'fr') || 'en';
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