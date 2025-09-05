'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react' // Add useState
import { logout } from '@/actions/logout'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const isAuthPage = pathname === '/login'
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	// Add state to track settings changes
	const [settingsVersion, setSettingsVersion] = useState(0)

	useEffect(() => {
		// 1. EARLY EXIT: Don't run auto-lock on login page
		if (isAuthPage) return;

		// 2. LOAD SETTINGS: Get auto-lock preferences from localStorage
		let settings = { enabled: false, duration: 10 }; // Default settings
		try {
			const saved = localStorage.getItem('autoLockSettings');
			if (saved) settings = JSON.parse(saved);
		} catch (e) {
			// If localStorage fails, use defaults
			console.error('Failed to load auto-lock settings:', e);
		}

		// 3. EARLY EXIT: Don't run if auto-lock is disabled
		if (!settings.enabled) {
			// Clear any existing timer if auto-lock is disabled
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			return;
		}

		// 4. TIMER FUNCTION: Reset inactivity countdown
		const resetTimer = () => {
			// Clear existing timer (if any)
			if (timerRef.current) clearTimeout(timerRef.current);

			// Start new countdown
			timerRef.current = setTimeout(async () => {
				try {
					await logout(); // This redirects to /login
				} catch (error) {
					console.error('Auto-lock failed:', error);
				}
			}, settings.duration * 60 * 1000); // Convert minutes to milliseconds
		};

		// 5. EVENT LISTENERS: Activities that reset the timer
		const events = ['mousedown', 'keypress', 'scroll'];
		events.forEach(eventName => {
			document.addEventListener(eventName, resetTimer, { passive: true });
		});

		// 6. START TIMER: Begin the initial countdown
		resetTimer();

		// 7. CLEANUP: Remove listeners and timer when component unmounts
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
			events.forEach(eventName => {
				document.removeEventListener(eventName, resetTimer);
			});
		};
	}, [isAuthPage, settingsVersion]); // Add settingsVersion to dependencies

	// Listen for localStorage changes (when settings are updated)
	useEffect(() => {
		const handleStorageChange = () => {
			setSettingsVersion(prev => prev + 1); // Trigger re-run of main useEffect
		};

		// Listen for localStorage changes from other tabs/windows
		window.addEventListener('storage', handleStorageChange);

		// Custom event for same-tab changes (we'll dispatch this from SettingsPage)
		window.addEventListener('autoLockSettingsChanged', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('autoLockSettingsChanged', handleStorageChange);
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	// 8. RENDER: Normal layout rendering
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
			{!isAuthPage && <Navbar />}
			<main className={
				!isAuthPage
					? "flex-1 container mx-auto px-4 py-8 mt-16 mb-12 overflow-auto"
					: "flex-1 min-h-screen"
			}>
				{children}
			</main>
			{!isAuthPage && <Footer />}
		</div>
	)
}