import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '../context/LanguageContext'
import '../styles/globals.css'
import LayoutWrapper from '../components/LayoutWrapper'
import localFont from 'next/font/local'

const myFont = localFont({
	src: '../../public/Fonts/Inter-VariableFont_opsz,wght.ttf',
})

export const metadata = {
	title: 'DataFlow - Client Management Solution',
	description: 'Client management and money calculation system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={myFont.className}>
			<body>
				<LanguageProvider>
					<Toaster position="top-right" containerStyle={{ top: 80 }} />
					<LayoutWrapper>
						{children}
					</LayoutWrapper>
				</LanguageProvider>
			</body>
		</html>
	)
}