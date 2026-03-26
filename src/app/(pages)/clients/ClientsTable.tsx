"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
	Search, Plus, Filter, Edit, Trash2, ChevronDown,
	ChevronUp, FileSpreadsheet, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import AddClientModal from '../../../components/AddClientModal';
import toast from 'react-hot-toast';
import { deleteClient } from '../../../actions/clients';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

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

interface SortConfig {
	key: keyof Client;
	direction: 'asc' | 'desc';
}

const companies = ['Sorec', 'Wafasalaf', 'Salafin', 'Vivalis', 'Sofac'];
const ITEMS_PER_PAGE = 8;

export default function ClientsTable({ initialClients }: { initialClients: Client[] }) {
	const { t } = useLanguage();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCompany, setSelectedCompany] = useState('');
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [editingClient, setEditingClient] = useState<Client | null>(null);
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'date', direction: 'desc' });
	const [currentPage, setCurrentPage] = useState(1);
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const filteredClients = useMemo(() => {
		let results = [...initialClients];

		if (selectedCompany) {
			results = results.filter(client => client.company === selectedCompany);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			results = results.filter(client =>
				client.name.toLowerCase().includes(query) ||
				client.idCard.toLowerCase().includes(query) ||
				client.phone.includes(query) ||
				client.fileId.toString().includes(query)
			);
		}

		if (sortConfig.key) {
			results.sort((a, b) => {
				const aValue = a[sortConfig.key] ?? '';
				const bValue = b[sortConfig.key] ?? '';

				if (aValue < bValue) {
					return sortConfig.direction === 'asc' ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === 'asc' ? 1 : -1;
				}
				return 0;
			});
		}

		return results;
	}, [initialClients, selectedCompany, searchQuery, sortConfig]);

	useEffect(() => {
		setCurrentPage(1);
	}, [filteredClients]);

	const handleSort = (key: keyof Client) => {
		let direction: 'asc' | 'desc' = 'asc';
		if (sortConfig.key === key && sortConfig.direction === 'asc') {
			direction = 'desc';
		}
		setSortConfig({ key, direction });
	};

	const handleDelete = async (id?: number) => {
		if (!id) {
			toast.error(t('form.errors.deleteFailed'));
			return;
		}
		setDeleteId(id);
	}
	const confirmDelete = async () => {
		if (!deleteId) return;

		try {
			await deleteClient(deleteId);
			router.refresh();
			toast.success(t('form.success.deleted'));
		} catch (error) {
			console.error('Error deleting client:', error);
			toast.error(t('form.errors.deleteFailed'));
		}
		setDeleteId(null);
	};

	const handleEdit = (client: Client) => {
		setEditingClient(client);
		setIsAddModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsAddModalOpen(false);
		setEditingClient(null);
	};

	const SortIcon = ({ column }: { column: keyof Client }) => {
		if (sortConfig.key !== column) {
			return <ChevronDown className="h-4 w-4 text-gray-400" />;
		}
		return sortConfig.direction === 'asc'
			? <ChevronUp className="h-4 w-4 text-blue-500" />
			: <ChevronDown className="h-4 w-4 text-blue-500" />;
	};

	const totalPages = 25;

	const getPaginationNumbers = (): (number | string)[] => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i);
		}

		rangeWithDots.push(1);

		if (range.length > 0 && range[0] > 2) {
			rangeWithDots.push('...');
		}

		rangeWithDots.push(...range);

		if (range.length > 0 && range[range.length - 1] < totalPages - 1) {
			rangeWithDots.push('...');
		}

		if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">{t('clients.title')}</h1>
				<motion.button
					onClick={() => setIsAddModalOpen(true)}
					className=" cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					whileHover={{ scale: 1.04 }}
					whileTap={{ scale: 0.96 }}
				>
					<Plus className="h-4 w-4 mr-2" />
					{t('clients.add')}
				</motion.button>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
				<div className="p-5 border-b border-gray-200">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div className="relative flex-1">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
								placeholder={t('clients.search')}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>

						<div className="flex items-center">
							<Filter className="h-5 w-5 text-gray-400 mr-2" />
							<select
								className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50 text-gray-700"
								value={selectedCompany}
								onChange={(e) => setSelectedCompany(e.target.value)}
							>
								<option value="" className="text-gray-500">{t('clients.filter')}</option>
								{companies.map((company) => (
									<option key={company} value={company} className="text-gray-700">
										{company}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('name')}
								>
									<div className="flex items-center">
										{t('clients.name')}
										<SortIcon column="name" />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('idCard')}
								>
									<div className="flex items-center">
										{t('clients.id')}
										<SortIcon column="idCard" />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('phone')}
								>
									<div className="flex items-center">
										{t('clients.phone')}
										<SortIcon column="phone" />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('date')}
								>
									<div className="flex items-center">
										{t('clients.date')}
										<SortIcon column="date" />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('amount')}
								>
									<div className="flex items-center">
										{t('clients.amount')}
										<SortIcon column="amount" />
									</div>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
									onClick={() => handleSort('fileId')}
								>
									<div className="flex items-center">
										{t('clients.fileId')}
										<SortIcon column="fileId" />
									</div>
								</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									{t('clients.company')}
								</th>
								<th scope="col" className="relative px-6 py-3">
									<span className="sr-only">{t('clients.actions')}</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{paginatedClients.length > 0 ? (
								paginatedClients.map((client) => (
									<tr key={client.id ?? client.idCard} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-900">{client.name}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">{client.idCard}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">{client.phone}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">
												{new Date(client.date).toLocaleDateString('en-GB', {
													day: '2-digit',
													month: '2-digit',
													year: '2-digit'
												})}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{client.amount.toFixed(2)} DH/ {client.duration}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center text-sm text-gray-500">
												<FileSpreadsheet className="h-4 w-4 mr-1 text-gray-400" />
												{client.fileId}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
												{client.company}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												onClick={() => handleEdit(client)}
												className="text-blue-600 hover:text-blue-900 mr-4"
											>
												<Edit className="h-4 w-4" />
											</button>
											<button
												onClick={() => handleDelete(client.id)}
												className="text-red-600 hover:text-red-900"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
										{t('clients.noResults')}
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				<div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
					<div className="flex items-center justify-between">
						<div className="text-sm text-gray-700">
							{t('clients.showing', {
								start: startIndex + 1,
								end: Math.min(startIndex + ITEMS_PER_PAGE, filteredClients.length),
								total: filteredClients.length
							})}
						</div>
						{totalPages > 1 && (
							<div className="flex items-center space-x-2">
								<button
									onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
									disabled={currentPage === 1}
									className={`p-2 rounded-md ${currentPage === 1
										? 'text-gray-400 cursor-not-allowed'
										: 'text-gray-700 hover:bg-gray-100'
										}`}
								>
									<ChevronLeft className="h-5 w-5" />
								</button>

								{getPaginationNumbers().map((page, index) => (
									page === '...' ? (
										<span key={`ellipsis-${index}`} className="px-2 text-gray-500">
											...
										</span>
									) : (
										<button
											key={page}
											onClick={() => setCurrentPage(page as number)}
											className={`px-3 py-1 rounded-md ${currentPage === page
												? 'bg-blue-600 text-white'
												: 'text-gray-700 hover:bg-gray-100'
												}`}
										>
											{page}
										</button>
									)
								))}

								<button
									onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
									disabled={currentPage === totalPages}
									className={`p-2 rounded-md ${currentPage === totalPages
										? 'text-gray-400 cursor-not-allowed'
										: 'text-gray-700 hover:bg-gray-100'
										}`}
								>
									<ChevronRight className="h-5 w-5" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{deleteId && (
				<AnimatePresence>
					<motion.div
						className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
							<h3 className="text-lg font-medium mb-4 text-gray-700">{t('clients.confirmDelete')}</h3>
							<div className="flex justify-end space-x-3">
								<button
									onClick={() => setDeleteId(null)}
									className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50 hover:shadow-lg transition-colors duration-150 cursor-pointer"
								>
									{t('form.buttons.cancel')}
								</button>
								<button
									onClick={confirmDelete}
									className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:shadow-lg transition-colors duration-150 cursor-pointer"
								>
									{t('form.buttons.delete')}
								</button>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>
			)}

			{isAddModalOpen && (
				<AddClientModal
					isOpen={isAddModalOpen}
					onClose={handleCloseModal}
					client={editingClient}
					companies={companies}
				/>
			)}
		</div>
	);
} 