'use client';

import React, { createContext, useContext, useState } from 'react';

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
	language: 'en' | 'fr';
	setLanguage: (lang: 'en' | 'fr') => void;
	t: (key: TranslationKey, params?: Record<string, any>) => string;
}

const translations = {
	en: {
		'nav.dashboard': 'Dashboard',
		'nav.clients': 'Clients',
		'nav.money': 'Money Calculation',
		'welcome.title': 'Welcome to your client management solution',
		'welcome.subtitle': 'Effortlessly manage your client information with DataFlow. Add, view, and search through essential data to streamline your workflow.',
		'welcome.getStarted': 'Get Started',
		'clients.title': 'Client Management',
		'clients.subtitle': 'Efficiently organize and track your client information in one centralized location.',
		'clients.view': 'View Clients',
		'clients.add': 'Add Client',
		'clients.search': 'Search clients...',
		'clients.filter': 'All Companies',
		'clients.export': 'Export',
		'clients.name': 'Name',
		'clients.id': 'ID',
		'clients.phone': 'Phone Number',
		'clients.date': 'Date',
		'clients.amount': 'Amount',
		'clients.fileId': 'File ID',
		'clients.company': 'Company',
		'clients.actions': 'Actions',
		'clients.noResults': 'No clients found. Add a new client to get started.',
		'clients.showing': 'Showing {start} to {end} of {total} results',
		'clients.confirmDelete': 'Are you sure you want to delete this client?',
		'money.title': 'Money Calculation',
		'money.subtitle': 'Quickly calculate and manage financial transactions with our intuitive calculator.',
		'money.calculate': 'Calculate Now',
		'money.reset': 'Reset',
		'money.total': 'Total Amount',
		'database.title': 'Database Status',
		'database.subtitle': 'Your local database is active and ready for managing client data.',
		'database.connected': 'Connected',
		'quickTips.title': 'Quick Tips',
		'quickTips.clients': 'Group clients by company and use tags for better organization.',
		'quickTips.money': 'Use the money calculator to quickly tally up transactions.',
		'form.title.add': 'Add New Client',
		'form.title.edit': 'Edit Client',
		'form.labels.name': 'Name',
		'form.labels.phone': 'Phone Number',
		'form.labels.date': 'Date',
		'form.labels.amount': 'Amount',
		'form.labels.fileId': 'File ID',
		'form.labels.company': 'Company',
		'form.placeholders.selectCompany': 'Select a company',
		'form.buttons.cancel': 'Cancel',
		'form.buttons.add': 'Add Client',
		'form.buttons.update': 'Update Client',
		'form.errors.nameRequired': 'Name is required',
		'form.errors.phoneRequired': 'Phone number is required',
		'form.errors.phoneInvalid': 'Phone number must be 10 digits',
		'form.errors.dateRequired': 'Date is required',
		'form.errors.amountInvalid': 'Amount must be greater than 0',
		'form.errors.fileIdRequired': 'File ID is required',
		'form.errors.companyRequired': 'Company is required',
		'form.errors.saveFailed': 'Failed to save client',
		'form.success.added': 'Client added successfully',
		'form.success.updated': 'Client updated successfully'
	},
	fr: {
		'nav.dashboard': 'Tableau de bord',
		'nav.clients': 'Clients',
		'nav.money': 'Calcul d\'argent',
		'welcome.title': 'Bienvenue dans votre solution de gestion client',
		'welcome.subtitle': 'Gérez facilement vos informations client avec DataFlow. Ajoutez, consultez et recherchez des données essentielles pour optimiser votre flux de travail.',
		'welcome.getStarted': 'Commencer',
		'clients.title': 'Gestion des clients',
		'clients.subtitle': 'Organisez et suivez facilement les informations de vos clients dans un emplacement centralisé.',
		'clients.view': 'Voir les clients',
		'clients.add': 'Ajouter un client',
		'clients.search': 'Rechercher des clients...',
		'clients.filter': 'Toutes les entreprises',
		'clients.export': 'Exporter',
		'clients.name': 'Nom',
		'clients.id': 'ID',
		'clients.phone': 'Numéro de téléphone',
		'clients.date': 'Date',
		'clients.amount': 'Montant',
		'clients.fileId': 'ID de fichier',
		'clients.company': 'Entreprise',
		'clients.actions': 'Actions',
		'clients.noResults': 'Aucun client trouvé. Ajoutez un nouveau client pour commencer.',
		'clients.showing': 'Affichage de {start} à {end} sur {total} résultats',
		'clients.confirmDelete': 'Êtes-vous sûr de vouloir supprimer ce client ?',
		'money.title': 'Calcul d\'argent',
		'money.subtitle': 'Calculez et gérez facilement les transactions financières avec notre calculatrice intuitive.',
		'money.calculate': 'Calculer maintenant',
		'money.reset': 'Réinitialiser',
		'money.total': 'Montant total',
		'quickTips.title': 'Conseils rapides',
		'quickTips.clients': 'Groupez les clients par entreprise et utilisez des tags pour une meilleure organisation.',
		'quickTips.money': 'Utilisez le calculateur d\'argent pour rapidement additionner les transactions.',
		'database.title': 'Statut de la base de données',
		'database.subtitle': 'Votre base de données locale est active et prête à gérer les données de vos clients.',
		'database.connected': 'Connecté',
		'form.title.add': 'Ajouter un nouveau client',
		'form.title.edit': 'Modifier le client',
		'form.labels.name': 'Nom',
		'form.labels.phone': 'Numéro de téléphone',
		'form.labels.date': 'Date',
		'form.labels.amount': 'Montant',
		'form.labels.fileId': 'ID de fichier',
		'form.labels.company': 'Entreprise',
		'form.placeholders.selectCompany': 'Sélectionner une entreprise',
		'form.buttons.cancel': 'Annuler',
		'form.buttons.add': 'Ajouter',
		'form.buttons.update': 'Mettre à jour',
		'form.errors.nameRequired': 'Le nom est requis',
		'form.errors.phoneRequired': 'Le numéro de téléphone est requis',
		'form.errors.phoneInvalid': 'Le numéro de téléphone doit contenir 10 chiffres',
		'form.errors.dateRequired': 'La date est requise',
		'form.errors.amountInvalid': 'Le montant doit être supérieur à 0',
		'form.errors.fileIdRequired': 'L\'ID de fichier est requis',
		'form.errors.companyRequired': 'L\'entreprise est requise',
		'form.errors.saveFailed': 'Échec de l\'enregistrement du client',
		'form.success.added': 'Client ajouté avec succès',
		'form.success.updated': 'Client mis à jour avec succès'
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<'en' | 'fr'>('en');

	const t = (key: TranslationKey, params?: Record<string, any>): string => {
		let text = translations[language][key] || key;

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				text = text.replace(`{${key}}`, value);
			});
		}

		return text;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}; 