import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useForm } from 'react-hook-form';

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

type ClientFormData = Omit<Client, 'date'> & { date: string };

export default function AddClientModal({ isOpen, onClose, client, companies }: AddClientModalProps) {
	const { t } = useLanguage();

	const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientFormData>({
		defaultValues: {
			idCard: '',
			name: '',
			phone: '',
			date: new Date().toISOString().split('T')[0],
			amount: 0,
			duration: 0,
			fileId: '',
			company: ''
		}
	});

	useEffect(() => {
		if (client) {
			reset({
				...client,
				date: new Date(client.date).toISOString().split('T')[0]
			});
		} else {
			reset({
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
	}, [client, reset]);

	if (!isOpen) return null;

	const onSubmit = (data: ClientFormData) => {
		// TODO: Implement form submission logic
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-white/5 backdrop-blur-sm  flex items-center justify-center p-4 ">
			<div className="bg-white rounded-lg p-6 w-full max-w-md  shadow-2xl">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-gray-800">
						{client ? t('form.title.edit') : t('form.title.add')}
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 -mr-2">
						<X className="h-6 w-6" />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.name')}
						</label>
						<input
							type="text"
							id="name"
							{...register('name', { required: t('form.errors.nameRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
					</div>

					<div>
						<label htmlFor="idCard" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.id')}
						</label>
						<input
							type="text"
							id="idCard"
							{...register('idCard', { required: t('form.errors.idRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.idCard && <span className="text-red-500 text-xs">{errors.idCard.message as string}</span>}
					</div>

					<div>
						<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.phone')}
						</label>
						<input
							type="tel"
							id="phone"
							{...register('phone', { required: t('form.errors.phoneRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.phone && <span className="text-red-500 text-xs">{errors.phone.message as string}</span>}
					</div>

					<div>
						<label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.date')}
						</label>
						<input
							type="date"
							id="date"
							{...register('date', { required: t('form.errors.dateRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.date && <span className="text-red-500 text-xs">{errors.date.message as string}</span>}
					</div>

					<div>
						<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.amount')}
						</label>
						<input
							type="number"
							id="amount"
							step="0.01"
							min="0"
							{...register('amount', { required: t('form.errors.amountInvalid'), min: { value: 0.01, message: t('form.errors.amountInvalid') } })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.amount && <span className="text-red-500 text-xs">{errors.amount.message as string}</span>}
					</div>

					<div>
						<label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.duration')}
						</label>
						<input
							type="number"
							id="duration"
							min="1"
							{...register('duration', { required: 'Duration is required', min: { value: 1, message: t('form.errors.amountInvalid') } })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.duration && <span className="text-red-500 text-xs">{errors.duration.message as string}</span>}
					</div>

					<div>
						<label htmlFor="fileId" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.fileId')}
						</label>
						<input
							type="text"
							id="fileId"
							{...register('fileId', { required: t('form.errors.fileIdRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						/>
						{errors.fileId && <span className="text-red-500 text-xs">{errors.fileId.message as string}</span>}
					</div>

					<div>
						<label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
							{t('form.labels.company')}
						</label>
						<select
							id="company"
							{...register('company', { required: t('form.errors.companyRequired') })}
							className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
						>
							<option value="">{t('form.placeholders.selectCompany')}</option>
							{companies.map((company) => (
								<option key={company} value={company}>
									{company}
								</option>
							))}
						</select>
						{errors.company && <span className="text-red-500 text-xs">{errors.company.message as string}</span>}
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