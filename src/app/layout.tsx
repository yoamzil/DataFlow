import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { LanguageProvider } from '../context/LanguageContext'
import '../styles/globals.css'
import Footer from '@/components/Footer'


const inter = Inter({ subsets: ['latin'] })


export const metadata = {
	title: 'DataFlow Client Management',
	description: 'Client management and money calculation system',
}


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LanguageProvider>
					<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
						<Toaster position="top-right"
							containerStyle={{
								top: 80,
							}} />
						<Navbar />
						<main className="flex-1 container mx-auto px-4 py-8">
							{children}
						</main>
						<Footer />
					</div>
				</LanguageProvider>
			</body>
		</html>
	)
}