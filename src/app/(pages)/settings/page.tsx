'use client';

import React from 'react';
import { SettingsIcon, Lock, Eye, EyeOff, AlertCircle, Save, Clock, Globe, Check, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

// Validation schemas
const passwordSchema = z.object({
	currentPassword: z.string().min(1, 'Current password is required'),
	newPassword: z.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
	confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

const autoLockSchema = z.object({
	enabled: z.boolean(),
	duration: z.number().min(1).max(60)
});

type PasswordFormData = z.infer<typeof passwordSchema>;
type AutoLockFormData = z.infer<typeof autoLockSchema>;

const Settings = () => {
	const { language, setLanguage, t } = useLanguage();
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [autoLockSettings, setAutoLockSettings] = useState({
		enabled: false,
		duration: 10
	});

	// Password form
	const passwordForm = useForm<PasswordFormData>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		}
	});

	// Auto-lock form
	const autoLockForm = useForm<AutoLockFormData>({
		resolver: zodResolver(autoLockSchema),
		defaultValues: autoLockSettings
	});

	const onPasswordSubmit = async (data: PasswordFormData) => {
		try {
			// Simulate password change API call
			await new Promise(resolve => setTimeout(resolve, 1000));

			// In real app, verify current password and update
			if (data.currentPassword !== 'admin123') {
				passwordForm.setError('currentPassword', {
					message: 'Current password is incorrect'
				});
				return;
			}

			toast.success('Password changed successfully');
			passwordForm.reset();
		} catch (error) {
			toast.error('Failed to change password');
		}
	};

	const onAutoLockSubmit = (data: AutoLockFormData) => {
		setAutoLockSettings(data);
		toast.success('Auto-lock settings updated');
	};

	const handleLanguageChange = (newLanguage: 'en' | 'fr') => {
		setLanguage(newLanguage);
		toast.success(`Language changed to ${newLanguage === 'en' ? 'English' : 'Français'}`);
	};

	const getDurationText = (duration: number) => {
		if (duration === 1) return '1 minute';
		if (duration < 60) return `${duration} minutes`;
		return `${Math.floor(duration / 60)} hour${Math.floor(duration / 60) > 1 ? 's' : ''}`;
	};
	return (
		<div className="max-w-3xl mx-auto">
			{/* Header */}
			<div className="flex items-center mb-8">
				<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mr-4">
					<SettingsIcon className="h-6 w-6 text-white" />
				</div>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
					<p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
				</div>
			</div>

			<div className="space-y-8">
				{/* Language Settings */}
				<div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="px-8 py-6 border-b border-gray-100">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mr-4">
								<Globe className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Language</h2>
								<p className="text-sm text-gray-500 mt-1">Choose your preferred language</p>
							</div>
						</div>
					</div>

					<div className="p-8 flex flex-row gap-x-4">
						<button
							onClick={() => handleLanguageChange('en')}
							className={`text-gray-700 flex-1 flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 ${language === 'en'
								? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
								: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
								}`}
						>
							<div className="flex items-center">
								<span className="text-2xl mr-4">🇬🇧</span>
								<span className="font-semibold">English</span>
							</div>
							{language === 'en' && <Check className="h-5 w-5 text-blue-600" />}
						</button>

						<button
							onClick={() => handleLanguageChange('fr')}
							className={`text-gray-700 flex-1 flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 ${language === 'fr'
								? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
								: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
								}`}
						>
							<div className="flex items-center">
								<span className="text-2xl mr-4">🇫🇷</span>
								<span className="font-semibold">Français</span>
							</div>
							{language === 'fr' && <Check className="h-5 w-5 text-blue-600" />}
						</button>
					</div>
				</div>

				{/* Password Section */}
				<div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="px-8 py-6 border-b border-gray-100">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mr-4">
								<Lock className="h-6 w-6 text-red-600" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
								<p className="text-sm text-gray-500 mt-1">Update your account password for security</p>
							</div>
						</div>
					</div>

					<form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="p-8 space-y-6">
						{/* Current Password */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Current Password
							</label>
							<div className="relative">
								<input
									type={showCurrentPassword ? 'text' : 'password'}
									{...passwordForm.register('currentPassword')}
									className={`text-gray-700 w-full px-4 py-4 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm ${passwordForm.formState.errors.currentPassword
										? 'border-red-300 bg-red-50'
										: 'border-gray-200 bg-gray-50 focus:bg-white hover:border-gray-300'
										}`}
									placeholder="Enter your current password"
								/>
								<button
									type="button"
									onClick={() => setShowCurrentPassword(!showCurrentPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
							{passwordForm.formState.errors.currentPassword && (
								<p className="mt-2 text-sm text-red-600 flex items-center">
									<AlertCircle className="h-4 w-4 mr-1" />
									{passwordForm.formState.errors.currentPassword.message}
								</p>
							)}
						</div>

						{/* New Password */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								New Password
							</label>
							<div className="relative">
								<input
									type={showNewPassword ? 'text' : 'password'}
									{...passwordForm.register('newPassword')}
									className={`text-gray-700 w-full px-4 py-4 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm ${passwordForm.formState.errors.newPassword
										? 'border-red-300 bg-red-50'
										: 'border-gray-200 bg-gray-50 focus:bg-white hover:border-gray-300'
										}`}
									placeholder="Enter your new password"
								/>
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
							{passwordForm.formState.errors.newPassword && (
								<p className="mt-2 text-sm text-red-600 flex items-center">
									<AlertCircle className="h-4 w-4 mr-1" />
									{passwordForm.formState.errors.newPassword.message}
								</p>
							)}
							<div className="mt-2 text-xs text-gray-500">
								Password must contain at least 8 characters with uppercase, lowercase, and numbers
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-3">
								Confirm New Password
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									{...passwordForm.register('confirmPassword')}
									className={`text-gray-700 w-full px-4 py-4 pr-12 border-2 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm ${passwordForm.formState.errors.confirmPassword
										? 'border-red-300 bg-red-50'
										: 'border-gray-200 bg-gray-50 focus:bg-white hover:border-gray-300'
										}`}
									placeholder="Confirm your new password"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
								>
									{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
							{passwordForm.formState.errors.confirmPassword && (
								<p className="mt-2 text-sm text-red-600 flex items-center">
									<AlertCircle className="h-4 w-4 mr-1" />
									{passwordForm.formState.errors.confirmPassword.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={passwordForm.formState.isSubmitting}
							className="w-full flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
						>
							{passwordForm.formState.isSubmitting ? (
								<div className="flex items-center">
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
									Updating Password...
								</div>
							) : (
								<div className="flex items-center">
									<Save className="h-5 w-5 mr-2" />
									Update Password
								</div>
							)}
						</button>
					</form>
				</div>

				{/* Auto-Lock Section */}
				<div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
					<div className="px-8 py-6 border-b border-gray-100">
						<div className="flex items-center">
							<div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mr-4">
								<Clock className="h-6 w-6 text-orange-600" />
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Auto-Lock Settings</h2>
								<p className="text-sm text-gray-500 mt-1">Configure automatic screen locking</p>
							</div>
						</div>
					</div>

					<form onSubmit={autoLockForm.handleSubmit(onAutoLockSubmit)} className="p-8 space-y-6">
						{/* Enable Auto-Lock Toggle */}
						<div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
							<div>
								<h3 className="text-base font-semibold text-gray-900">Enable Auto-Lock</h3>
								<p className="text-sm text-gray-500 mt-1">Automatically lock the app after inactivity</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									{...autoLockForm.register('enabled')}
									className="sr-only peer"
								/>
								<div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-orange-600 shadow-inner"></div>
							</label>
						</div>

						{/* Duration Selector */}
						{autoLockForm.watch('enabled') && (
							<div className="space-y-4">
								<label className="block text-sm font-semibold text-gray-700">
									Lock after inactivity
								</label>
								<select
									{...autoLockForm.register('duration', { valueAsNumber: true })}
									className="text-gray-700 w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200 text-sm hover:border-gray-300"
								>
									<option value={1}>1 minute</option>
									<option value={5}>5 minutes</option>
									<option value={10}>10 minutes</option>
									<option value={15}>15 minutes</option>
									<option value={30}>30 minutes</option>
									<option value={60}>1 hour</option>
								</select>

								<div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
									<p className="text-sm text-orange-700 flex items-center">
										<Shield className="h-4 w-4 mr-2" />
										App will auto-lock after <strong className="mx-1">{getDurationText(autoLockForm.watch('duration'))}</strong> of inactivity.
									</p>
								</div>
							</div>
						)}

						<button
							type="submit"
							className="w-full flex items-center justify-center px-6 py-4 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-30 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
						>
							<Save className="h-5 w-5 mr-2" />
							Save Auto-Lock Settings
						</button>
					</form>
				</div>

			</div>
		</div>
	)
}

export default Settings;