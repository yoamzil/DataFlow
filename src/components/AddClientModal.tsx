import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Client {
	idCard: string;
	name: string;
	phone: string;
	date: Date;
	amount: number;
	duration: number;
	fileId: string;
	company: string;
}

interface AddClientModalProps {
	isOpen: boolean;
	onClose: () => void;
	client?: Client | null;
	companies: string[];
}

export default function AddClientModal({ isOpen, onClose, client, companies }: AddClientModalProps) {
	const { t } = useLanguage();
	const [formData, setFormData] = useState<Omit<Client, 'date'> & { date: string }>({
		idCard: '',
		name: '',
		phone: '',
		date: new Date().toISOString().split('T')[0],
		amount: 0,
		duration: 0,
		fileId: '',
		company: ''
	});

	useEffect(() => {
		if (client) {
			setFormData({
				...client,
				date: new Date(client.date).toISOString().split('T')[0]
			});
		} else {
			setFormData({
				idCard: '',
				name: '',
				phone: '',
				date: new Date().toISOString().split('T')[0],
				amount: 0,
				duration: 0,
				fileId: '',
				company: ''
			});
		}
	}, [client]);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement form submission
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-gray-800">
						{client ? t('form.title.edit') : t('form.title.add')}
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 -mr-2">
						<X className="h-6 w-6" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">

					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.name')}
						</label>
						<input
							type="text"
							id="name"
							required
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="idCard" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.id')}
						</label>
						<input
							type="text"
							id="idCard"
							required
							value={formData.idCard}
							onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.phone')}
						</label>
						<input
							type="tel"
							id="phone"
							required
							value={formData.phone}
							onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.date')}
						</label>
						<input
							type="date"
							id="date"
							required
							value={formData.date}
							onChange={(e) => setFormData({ ...formData, date: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.amount')}
						</label>
						<input
							type="number"
							id="amount"
							required
							min="0"
							step="0.01"
							value={formData.amount}
							onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
							className="block w-full px-3 py-2.5 text-base rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.duration')}
						</label>
						<input
							type="number"
							id="duration"
							required
							min="1"
							value={formData.duration}
							onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="fileId" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.fileId')}
						</label>
						<input
							type="text"
							id="fileId"
							required
							value={formData.fileId}
							onChange={(e) => setFormData({ ...formData, fileId: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
					</div>

					<div>
						<label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.company')}
						</label>
						<select
							id="company"
							required
							value={formData.company}
							onChange={(e) => setFormData({ ...formData, company: e.target.value })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						>
							<option value="">{t('form.placeholders.selectCompany')}</option>
							{companies.map((company) => (
								<option key={company} value={company}>
									{company}
								</option>
							))}
						</select>
					</div>

					<div className="flex justify-end space-x-4 mt-8">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150"
						>
							{t('form.buttons.cancel')}
						</button>
						<button
							type="submit"
							className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-150"
						>
							{client ? t('form.buttons.update') : t('form.buttons.add')}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
} 