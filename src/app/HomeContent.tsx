'use client';

import { ArrowRight, Database, Users, Calculator, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

export default function HomeContent() {
	const { t } = useLanguage();

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
			<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
				<div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
				<div className="relative px-8 py-16 sm:px-16 sm:py-24">
					<div className="max-w-3xl">
						<h1 className="text-4xl font-bold text-white mb-4 sm:text-5xl">
							{t('welcome.title')}
						</h1>
						<p className="text-xl text-blue-100 mb-8">
							{t('welcome.subtitle')}
						</p>
						<Link
							href="/clients"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white shadow-lg transition-all duration-150"
						>
							{t('welcome.getStarted')}
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</div>
				</div>
				<div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-1/2 aspect-square bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-50 blur-3xl"></div>
			</div>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 group">
					<div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
						<Users className="h-6 w-6 text-blue-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">{t('clients.title')}</h3>
					<p className="text-gray-600 mb-4">{t('clients.subtitle')}</p>
					<Link href="/clients" className="inline-flex items-center text-blue-600 hover:text-blue-700">
						{t('clients.view')}
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</div>

				<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 group">
					<div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
						<Calculator className="h-6 w-6 text-green-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">{t('money.title')}</h3>
					<p className="text-gray-600 mb-4">{t('money.subtitle')}</p>
					<Link href="/money-calculation" className="inline-flex items-center text-green-600 hover:text-green-700">
						{t('money.calculate')}
						<ChevronRight className="ml-1 h-4 w-4" />
					</Link>
				</div>

				<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200 group">
					<div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
						<Database className="h-6 w-6 text-purple-600" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">{t('database.title')}</h3>
					<p className="text-gray-600 mb-4">{t('database.subtitle')}</p>
					<div className="flex items-center text-purple-600">
						<div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
						<span className="font-medium">{t('database.connected')}</span>
					</div>
				</div>
			</div>
		</div>
	)
} 