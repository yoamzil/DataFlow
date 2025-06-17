'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
	const { t } = useLanguage();

	return (
		<footer className="bg-white border-t border-gray-200 mt-16">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="flex items-center text-gray-600 text-sm">
						<span>{t('footer.madeWith')}</span>
						<Heart className="h-4 w-4 mx-1 text-red-500" />
						<span>{t('footer.byTeam')}</span>
					</div>
					<div className="mt-2 md:mt-0">
						<p className="text-gray-600 text-sm">
							© 2025 DataFlow. {t('footer.allRights')}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;