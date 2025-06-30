import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { addClient, updateClient } from '@/actions/clients';


interface Client {
	id?: number;
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

	const [isLoading, setIsLoading] = useState(false);

	// Define Zod schema using t for error messages
	const clientFormSchema = z.object({
		idCard: z.string().min(1, t('form.errors.idRequired')).transform(val => val.replace(/\s+/g, "").toUpperCase()),
		name: z.string().min(1, t('form.errors.nameRequired'))
			.transform(val =>
				val
					.trim()
					.replace(/\s+/g, " ") // Replace multiple spaces with one
					.split(" ")
					.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
					.join(" ")
			),
		phone: z.string().min(10, t('form.errors.phoneInvalid'))
			.transform(val =>
				val
					.replace(/[^0-9]/g, "") // Remove non-digits
					.replace(/(.{2})/g, "$1 ") // Add space every 2 digits
					.trim() // Remove trailing space
			),
		date: z.string().min(1, t('form.errors.dateRequired')),
		amount: z.number().min(5000, t('form.errors.amountInvalid')),
		duration: z.number().min(12, t('form.errors.durationInvalid'))
			.max(144, t('form.errors.durationInvalid')),
		fileId: z.string().min(1, t('form.errors.fileIdRequired'))
			.transform(val => val.replace(/\s+/g, "").toUpperCase()),
		company: z.string().min(1, t('form.errors.companyRequired')),
	});

	const { register, handleSubmit, reset, formState: { errors } } = useForm<ClientFormData>({
		resolver: zodResolver(clientFormSchema),
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

	const onSubmit = async (data: ClientFormData) => {
		setIsLoading(true);
		try {
			if (client && client.id !== undefined) {
				await updateClient(client.id, {
					name: data.name,
					idCard: data.idCard,
					phone: data.phone,
					date: data.date,
					amount: data.amount,
					duration: data.duration,
					fileId: data.fileId,
					company: data.company
				});
				toast.success(t('form.success.updated'));
			} else {
				await addClient({
					idCard: data.idCard,
					name: data.name,
					phone: data.phone,
					date: data.date,
					amount: data.amount,
					duration: data.duration,
					fileId: data.fileId,
					company: data.company
				});
				toast.success(t('form.success.added'));
				reset();
			}
			onClose();
		} catch (error) {
			// Handle specific error types
			if (error instanceof Error) {
				if (error.message.includes('ID card already exists')) {
					toast.error('Client with this ID card already exists with different name or phone.');
				} else {
					// Generic error for other cases
					toast.error(t('form.errors.saveFailed'));
				}
			} else {
				// Fallback for non-Error objects
				toast.error(t('form.errors.saveFailed'));
			}
			console.error('Error adding client:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl p-6 w-full max-w-2xl ">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-gray-800">
						{client ? t('form.title.edit') : t('form.title.add')}
					</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 -mr-2">
						<X className="h-6 w-6" />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Row 1: Name and ID Card */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
								{t('form.labels.name')}
							</label>
							<input
								type="text"
								id="name"
								{...register('name')}
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
								{...register('idCard')}
								className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
							/>
							{errors.idCard && <span className="text-red-500 text-xs">{errors.idCard.message as string}</span>}
						</div>
					</div>

					{/* Row 2: Phone and Date */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
								{t('form.labels.phone')}
							</label>
							<input
								type="tel"
								id="phone"
								{...register('phone')}
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
								{...register('date')}
								className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
							/>
							{errors.date && <span className="text-red-500 text-xs">{errors.date.message as string}</span>}
						</div>
					</div>

					{/* Row 3: Amount and Duration */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
								{t('form.labels.amount')}
							</label>
							<input
								type="number"
								id="amount"
								step="0.01"
								{...register('amount', { valueAsNumber: true })}
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
								{...register('duration', { valueAsNumber: true })}
								className="block w-full px-3 py-2.5 text-base rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700"
							/>
							{errors.duration && <span className="text-red-500 text-xs">{errors.duration.message as string}</span>}
						</div>
					</div>

					{/* Row 4: File ID and Company */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="fileId" className="block text-sm font-medium text-gray-700 mb-1">
								{t('form.labels.fileId')}
							</label>
							<input
								type="text"
								id="fileId"
								{...register('fileId')}
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
								{...register('company')}
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
					</div>

					<div className="flex justify-end space-x-4 mt-8">
						<button
							type="button"
							onClick={onClose}
							className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150"
							disabled={isLoading}
						>
							{t('form.buttons.cancel')}
						</button>
						<button
							type="submit"
							disabled={isLoading}
							className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors duration-150 flex items-center justify-center"
						>
							{isLoading && (
								<svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
								</svg>
							)}
							{client ? t('form.buttons.update') : t('form.buttons.add')}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
} 