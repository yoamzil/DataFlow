'use client';

import { User, Eye, EyeOff, ArrowRight, Globe } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import { login } from '@/actions/auth';

export default function LoginPage() {
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { language, setLanguage, t } = useLanguage();

	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'fr' : 'en');
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isAuthenticated = await login(password);
		if (isAuthenticated) {
			router.push('/');
		}
		else {
			setError('Incorrect password');
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center relative overflow-hidden">
			{/* Language Switcher - Top Right Corner */}
			<div className="absolute top-6 right-6 z-30">
				<button
					onClick={toggleLanguage}
					className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-blue-700 shadow transition"
					aria-label="Switch language"
				>
					<Globe className="h-4 w-4" />
					<span className="font-medium">{language === 'en' ? 'FR' : 'EN'}</span>
				</button>
			</div>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage:
							'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
					}}
				></div>
			</div>

			{/* Login Card */}
			<div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 z-10">
				{/* User Avatar */}
				<div className="flex flex-col items-center mb-8">
					<div className="relative mb-4">
						<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
							<User className="h-12 w-12 text-white" />
						</div>
						{/* Online indicator */}
						<div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
					</div>
					<h2 className="text-2xl font-semibold text-gray-800 mb-1">{t('login.admin')}</h2>
					<p className="text-gray-500 text-sm">{t('login.welcome')}</p>
				</div>

				{/* Password Form */}
				<form
					className="space-y-6"
					onSubmit={handleSubmit}
				>
					<div className="space-y-2">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							{t('login.password')}
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								className="text-gray-700 w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
								placeholder={t('login.enterPassword')}
								autoFocus
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-3">
							<p className="text-red-600 text-sm">{error}</p>
						</div>
					)}

					{/* Sign In Button */}
					<button
						type="submit"
						className="w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
					>
						<div className="flex items-center">
							{t('login.submit')}
							<ArrowRight className="ml-2 h-5 w-5" />
						</div>
					</button>
				</form>
			</div>

			{/* Footer */}
			<div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
				<p className="text-white/70 text-sm">{t('login.version')}</p>
			</div>
		</div>
	);
}