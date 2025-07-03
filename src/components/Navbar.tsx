// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { Database, Users, Calculator, Settings, Globe, LogOut, User } from 'lucide-react';
import { usePathname } from 'next/navigation'
import { useLanguage } from '../context/LanguageContext'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname()
	const { language, setLanguage, t } = useLanguage()
	const router = useRouter()
	const isActive = (path: string) => pathname === path

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'fr' : 'en')
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSettings = () => {
		router.push('/settings');
		setIsDropdownOpen(false);
	};

	const handleLogout = () => {
		router.push('/login');
		setIsDropdownOpen(false);
	};

	return (
		<nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-lg border-b border-gray-200">
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
							<div className='not-lg:hidden'>
								{t('nav.dashboard')}
							</div>
						</Link>

						<Link
							href="/clients"
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${isActive('/clients')
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-100'
								}`}
						>
							<Users className="h-4 w-4 mr-2" />
							<div className='not-lg:hidden'>
								{t('nav.clients')}
							</div>
						</Link>

						<Link
							href="/money-calculation"
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${isActive('/money-calculation')
								? 'bg-blue-50 text-blue-700'
								: 'text-gray-700 hover:bg-gray-100'
								}`}
						>
							<Calculator className="h-4 w-4 mr-2" />
							<div className='not-lg:hidden'>
								{t('nav.money')}
							</div>
						</Link>

						<div className="relative ml-4" ref={dropdownRef}>
							<button
								onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								className={`cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDropdownOpen
									? 'bg-blue-50 text-blue-600 shadow-md'
									: 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700'
									}`}
							>
								<User className="h-5 w-5" />
							</button>
							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
									<div className="py-2">
										{/* Settings */}
										<div className="px-4 py-2">
											<button
												onClick={handleSettings}
												className="cursor-pointer w-full text-left px-3 py-2 text-sm rounded-lg flex items-center transition-all duration-150 text-gray-700 hover:bg-gray-50"
											>
												<Settings className="h-4 w-4 mr-3" />
												Settings
											</button>
										</div>
										{/* Divider */}
										<div className="border-t border-gray-100 my-2"></div>
										{/* Logout */}
										<div className="px-4 pb-2">
											<button
												onClick={handleLogout}
												className="cursor-pointer w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-150 flex items-center rounded-lg font-medium"
											>
												<LogOut className="h-4 w-4 mr-3" />
												Log Out
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar