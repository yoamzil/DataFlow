'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
	language: 'en' | 'fr';
	setLanguage: (lang: 'en' | 'fr') => void;
	t: (key: TranslationKey, params?: Record<string, unknown>) => string;
}

const translations = {
	en: {
		'login.admin': 'Administrator',
		'login.welcome': 'Welcome back',
		'login.password': 'Password',
		'login.enterPassword': 'Enter your password',
		'login.error': 'Incorrect password',
		'login.submit': 'Sign In',
		'login.version': 'DataFlow Client Management',
		'nav.dashboard': 'Dashboard',
		'nav.clients': 'Clients',
		'nav.money': 'Money Calculation',
		'nav.settings': 'Settings',
		'nav.logout': 'Log Out',
		'welcome.title': 'Welcome to your client management solution',
		'welcome.subtitle': 'Effortlessly manage your client information with DataFlow. Add, view, and search through essential data to streamline your workflow.',
		'welcome.getStarted': 'Get Started',
		'clients.title': 'Client Management',
		'clients.subtitle': 'Efficiently organize and track your client information in one centralized location.',
		'clients.view': 'View Clients',
		'clients.add': 'Add Client',
		'clients.search': 'Search clients...',
		'clients.filter': 'All Companies',
		'clients.name': 'Name',
		'clients.id': 'ID Card',
		'clients.phone': 'Phone Number',
		'clients.date': 'Date',
		'clients.amount': 'Amount / Duration',
		'clients.fileId': 'File Number',
		'clients.company': 'Company',
		'clients.actions': 'Actions',
		'clients.noResults': 'No clients found. Add a new client to get started.',
		'clients.showing': 'Showing {start} to {end} of {total} results',
		'clients.confirmDelete': 'Are you sure you want to delete this client?',
		'money.title': 'Money Calculation',
		'money.subtitle': 'Quickly calculate and manage financial transactions with our intuitive calculator.',
		'money.calculate': 'Calculate Now',
		'database.title': 'Database Status',
		'database.subtitle': 'Your local database is active and ready for managing client data.',
		'database.connected': 'Connected',
		'form.title.add': 'Add New Client',
		'form.title.edit': 'Edit Client',
		'form.labels.name': 'Full Name',
		'form.labels.id': 'ID Card',
		'form.labels.phone': 'Phone Number',
		'form.labels.date': 'Date',
		'form.labels.amount': 'Amount',
		'form.labels.duration': 'Duration',
		'form.labels.fileId': 'File Number',
		'form.labels.company': 'Company',
		'form.placeholders.selectCompany': 'Select a company',
		'form.buttons.cancel': 'Cancel',
		'form.buttons.delete': 'Delete',
		'form.buttons.add': 'Add Client',
		'form.buttons.update': 'Update Client',
		'form.errors.nameRequired': 'Name is required',
		'form.errors.idRequired': 'ID Card is required',
		'form.errors.phoneRequired': 'Phone number is required',
		'form.errors.phoneInvalid': 'Phone number must be 10 digits',
		'form.errors.dateRequired': 'Date is required',
		'form.errors.amountInvalid': 'Amount must be greater than 5000 DH',
		'form.errors.durationInvalid': 'Duration must be between 12 and 144 Months',
		'form.errors.fileIdRequired': 'File number is required',
		'form.errors.companyRequired': 'Company is required',
		'form.errors.saveFailed': 'Failed to save client',
		'form.errors.deleteFailed': 'Failed to delete client',
		'form.errors.exist': 'Client with this ID card already exists with different name or phone',
		'form.success.added': 'Client added successfully',
		'form.success.updated': 'Client updated successfully',
		'form.success.deleted': 'Client deleted successfully',
		'money.reset': 'Reset',
		'money.cash': 'Cash Counter',
		'money.cash.subtitle': 'Enter the quantity of each denomination to calculate the total amount',
		'money.total': 'Total Cash Amount',
		'money.total.subtitle': 'Sum of all cash denominations',
		'money.debt': 'Debt Tracker',
		'money.debt.subtitle': 'Keep track of your current debt balance',
		'money.current.debt': 'Current Debt',
		'money.debt.free': 'Debt Free!',
		'money.amount': 'Amount',
		'money.add.debt': 'Add Debt',
		'money.pay.debt': 'Pay Debt',
		'settings.title': 'Settings',
		'settings.subtitle': 'Manage your account preferences and security settings.',
		'settings.language': 'Language',
		'settings.language.subtitle': 'Choose your preferred language',
		'settings.language.en': 'English',
		'settings.language.fr': 'Français',
		'settings.languageChanged': 'Language changed successfully',
		'settings.changePassword': 'Change Password',
		'settings.changePassword.subtitle': 'Update your account password for security.',
		'settings.currentPassword': 'Current Password',
		'settings.currentPassword.subtitle': 'Enter your current password',
		'settings.currentPasswordError': 'Current password is required',
		'settings.newPassword': 'New Password',
		'settings.newPassword.subtitle': 'Enter your new password',
		'settings.newPasswordError': 'Password must be at least 4 characters',
		'settings.confirmPassword': 'Confirm New Password',
		'settings.confirmPassword.subtitle': 'Confirm your new password',
		'settings.confirmPasswordMismatch': 'New password and confirm password do not match',
		'settings.updating': 'Updating Password...',
		'settings.updatepassword': 'Update Password',
		'settings.passwordUpdated': 'Password changed successfully',
		'settings.passwordError': 'Current password is incorrect',
		'settings.error': 'An error occurred while updating settings',
		'settings.autoLock.title': 'Auto-Lock Settings',
		'settings.autoLock.toast': 'Auto-Lock settings updated successfully',
		'settings.autoLock.subtitle': 'Configure automatic screen locking.',
		'settings.autoLock.enable': 'Enable Auto-Lock',
		'settings.autoLock.subtitle.enable': 'Automatically lock the app after inactivity',
		'settings.autoLock.minutes': 'Lock after inactivity',
		'settings.autoLock.hour': 'Hour',
		'settings.autoLock.hours': 'Hours',
		'settings.autoLock.alert': 'App will lock after',
		'settings.autoLock.alert2': 'of inactivity',
		'settings.autoLock.save': 'Save Auto-Lock Settings',
	},
	fr: {
		'login.admin': 'Administrateur',
		'login.welcome': 'Bienvenue',
		'login.password': 'Mot de passe',
		'login.enterPassword': 'Entrez votre mot de passe',
		'login.error': 'Mot de passe incorrect',
		'login.submit': 'Se connecter',
		'login.version': 'DataFlow Gestion Client',
		'nav.dashboard': 'Tableau de bord',
		'nav.clients': 'Clients',
		'nav.money': 'Calcul d\'argent',
		'nav.settings': 'Paramètres',
		'nav.logout': 'Se déconnecter',
		'welcome.title': 'Bienvenue dans votre solution de gestion client',
		'welcome.subtitle': 'Gérez facilement vos informations client avec DataFlow. Ajoutez, consultez et recherchez des données essentielles pour optimiser votre flux de travail.',
		'welcome.getStarted': 'Commencer',
		'clients.title': 'Gestion des clients',
		'clients.subtitle': 'Organisez et suivez facilement les informations de vos clients dans un emplacement centralisé.',
		'clients.view': 'Voir les clients',
		'clients.add': 'Ajouter un client',
		'clients.search': 'Rechercher des clients...',
		'clients.filter': 'Toutes les entreprises',
		'clients.name': 'Nom',
		'clients.id': 'Carte d\'identité',
		'clients.phone': 'Numéro de téléphone',
		'clients.date': 'Date',
		'clients.amount': 'Montant / Durée',
		'clients.fileId': 'No. de dossier',
		'clients.company': 'Entreprise',
		'clients.actions': 'Actions',
		'clients.noResults': 'Aucun client trouvé. Ajoutez un nouveau client pour commencer.',
		'clients.showing': 'Affichage de {start} à {end} sur {total} résultats',
		'clients.confirmDelete': 'Êtes-vous sûr de vouloir supprimer ce client ?',
		'money.title': 'Calcul d\'argent',
		'money.subtitle': 'Calculez et gérez facilement les transactions financières avec notre calculatrice intuitive.',
		'money.calculate': 'Calculer maintenant',
		'money.reset': 'Réinitialiser',
		'money.cash': 'La caisse',
		'money.cash.subtitle': 'Entrez la quantité de chaque dénomination pour calculer le montant total',
		'money.total': 'Montant total de la caisse',
		'money.total.subtitle': 'Somme de toutes les dénominations en espèces',
		'money.debt': 'Suivi de la dette',
		'money.debt.subtitle': 'Gardez une trace de votre solde de dette actuel',
		'money.current.debt': 'Dette actuelle',
		'money.debt.free': 'Sans dette!',
		'money.amount': 'Montant',
		'money.add.debt': 'Ajouter une dette',
		'money.pay.debt': 'Payer la dette',
		'database.title': 'Statut de la base de données',
		'database.subtitle': 'Votre base de données locale est active et prête à gérer les données de vos clients.',
		'database.connected': 'Connecté',
		'form.title.add': 'Ajouter un nouveau client',
		'form.title.edit': 'Modifier le client',
		'form.labels.name': 'Nom et prénom',
		'form.labels.id': 'Carte d\'identité',
		'form.labels.phone': 'Numéro de téléphone',
		'form.labels.date': 'Date',
		'form.labels.amount': 'Montant',
		'form.labels.duration': 'Durée',
		'form.labels.fileId': 'No. de dossier',
		'form.labels.company': 'Entreprise',
		'form.placeholders.selectCompany': 'Sélectionner une entreprise',
		'form.buttons.cancel': 'Annuler',
		'form.buttons.delete': 'Supprimer',
		'form.buttons.add': 'Ajouter',
		'form.buttons.update': 'Mettre à jour',
		'form.errors.nameRequired': 'Le nom est requis',
		'form.errors.idRequired': 'La carte d\'identité est requise',
		'form.errors.phoneRequired': 'Le numéro de téléphone est requis',
		'form.errors.phoneInvalid': 'Le numéro de téléphone doit contenir 10 chiffres',
		'form.errors.dateRequired': 'La date est requise',
		'form.errors.amountInvalid': 'Le montant doit être supérieur à 5000 DH',
		'form.errors.durationInvalid': 'La durée doit être comprise entre 12 et 144 mois',
		'form.errors.fileIdRequired': 'Le No. de dossier est requis',
		'form.errors.companyRequired': 'L\'entreprise est requise',
		'form.errors.saveFailed': 'Échec de l\'enregistrement du client',
		'form.errors.deleteFailed': 'Échec de la suppression du client',
		'form.errors.exist': 'Un client avec cette carte d\'identité existe déjà avec un nom ou un téléphone différent',
		'form.success.added': 'Client ajouté avec succès',
		'form.success.updated': 'Client mis à jour avec succès',
		'form.success.deleted': 'Client supprimé avec succès',
		'settings.title': 'Paramètres',
		'settings.subtitle': 'Gérez vos préférences de compte et les paramètres de sécurité.',
		'settings.language': 'Langue',
		'settings.language.subtitle': 'Choisissez votre langue préférée',
		'settings.language.en': 'Anglais',
		'settings.language.fr': 'Français',
		'settings.languageChanged': 'Langue changée avec succès',
		'settings.changePassword': 'Changer le mot de passe',
		'settings.changePassword.subtitle': 'Mettez à jour votre mot de passe pour plus de sécurité.',
		'settings.currentPassword': 'Mot de passe actuel',
		'settings.currentPassword.subtitle': 'Entrez votre mot de passe actuel',
		'settings.currentPasswordError': 'Le mot de passe actuel est requis',
		'settings.newPassword': 'Nouveau mot de passe',
		'settings.newPassword.subtitle': 'Entrez votre nouveau mot de passe',
		'settings.newPasswordError': 'Le mot de passe doit comporter au moins 4 caractères',
		'settings.confirmPassword': 'Confirmer le nouveau mot de passe',
		'settings.confirmPassword.subtitle': 'Confirmez votre nouveau mot de passe',
		'settings.confirmPasswordMismatch': 'Le nouveau mot de passe et la confirmation ne correspondent pas',
		'settings.updatepassword': 'Mettre à jour le mot de passe',
		'settings.passwordUpdated': 'Mot de passe changé avec succès',
		'settings.updating': 'Mise à jour du mot de passe...',
		'settings.passwordError': 'Le mot de passe actuel est incorrect',
		'settings.error': 'Une erreur s\'est produite lors de la mise à jour des paramètres',
		'settings.autoLock.title': 'Paramètres de verrouillage automatique',
		'settings.autoLock.subtitle': 'Configurez le verrouillage automatique de l\'écran.',
		'settings.autoLock.toast': 'Paramètres de verrouillage automatique mis à jour avec succès',
		'settings.autoLock.enable': 'Activer le verrouillage automatique',
		'settings.autoLock.subtitle.enable': 'Verrouillez automatiquement l\'application après une période d\'inactivité',
		'settings.autoLock.minutes': 'Verrouiller après une période d\'inactivité',
		'settings.autoLock.hour': 'Heure',
		'settings.autoLock.hours': 'Heures',
		'settings.autoLock.alert': 'L\'application se verrouillera après',
		'settings.autoLock.alert2': 'd\'inactivité',
		'settings.autoLock.save': 'Enregistrer les paramètres de verrouillage automatique',
	},
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider');
	}
	return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode, initialLanguage?: 'en' | 'fr' }> = ({ children, initialLanguage }) => {
	const [language, setLanguageState] = useState<'en' | 'fr'>(() => {
		if (initialLanguage) return initialLanguage;
		if (typeof window !== 'undefined') {
			// Client-side: read from cookie
			const match = document.cookie.match(/(?:^|; )language=([^;]*)/);
			return (match ? decodeURIComponent(match[1]) : 'en') as 'en' | 'fr';
		}
		// Server-side: fallback to 'en' (could be improved for SSR)
		return 'en';
	});

	// When language changes, set cookie via server action
	const setLanguage = async (lang: 'en' | 'fr') => {
		setLanguageState(lang);
		// Dynamically import server action to avoid SSR issues
		if (typeof window !== 'undefined') {
			const { setLanguageCookie } = await import('@/actions/language');
			setLanguageCookie(lang);
			// Also set client cookie for immediate effect
			document.cookie = `language=${lang}; path=/`;
		}
	};

	const t = (key: TranslationKey, params?: Record<string, unknown>): string => {
		let text = translations[language][key] || key;
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				text = text.replace(`{${key}}`, String(value));
			});
		}
		return text;
	};

	// Sync language state with cookie on mount (in case cookie was set elsewhere)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const match = document.cookie.match(/(?:^|; )language=([^;]*)/);
			const cookieLang = (match ? decodeURIComponent(match[1]) : 'en') as 'en' | 'fr';
			if (cookieLang !== language) setLanguageState(cookieLang);
		}
	}, []);

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}; 