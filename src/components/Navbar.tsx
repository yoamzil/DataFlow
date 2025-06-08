// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Database, Users, Calculator, Globe } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'

const Navbar = () => {
	const pathname = usePathname()
	const { language, setLanguage, t } = useLanguage()

	const isActive = (path: string) => pathname === path

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'fr' : 'en')
	}

	return (
		<nav className="bg-white shadow-lg border-b border-gray-200">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Database className="h-8 w-8 text-blue-500" />
						<span className="ml-2 text-xl font-semibold text-gray-900">DataFlow</span>
					</div>

					<div className="flex items-center space-x-2">
						<Link
							href="/"
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${isActive('/')
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-100'
								}`}
						>
							<Database className="h-4 w-4 mr-2" />
							{t('nav.dashboard')}
						</Link>

						<Link
							href="/clients"
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${isActive('/clients')
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-100'
								}`}
						>
							<Users className="h-4 w-4 mr-2" />
							{t('nav.clients')}
						</Link>

						<Link
							href="/money-calculation"
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${isActive('/money-calculation')
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-100'
								}`}
						>
							<Calculator className="h-4 w-4 mr-2" />
							{t('nav.money')}
						</Link>

						<button
							onClick={toggleLanguage}
							className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150 ml-2"
						>
							<Globe className="h-4 w-4 mr-2" />
							{language.toUpperCase()}
						</button>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar