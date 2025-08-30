'use client'

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, RefreshCw, Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCurrentDebt, updateDebt } from '@/actions/debt';

const LoadingSpinner = () => (
	<div className="flex items-center justify-center">
		<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
	</div>
);

const MoneyCalculation = () => {
	const { t } = useLanguage();

	// State for denomination counts
	const [counts, setCounts] = useState({
		200: 0,
		100: 0,
		50: 0,
		20: 0,
		10: 0,
		5: 0,
		2: 0,
		1: 0
	});

	// State for debt
	const [currentDebt, setCurrentDebt] = useState(0);
	const [debtInput, setDebtInput] = useState('');
	const [isLoadingDebt, setIsLoadingDebt] = useState(true);

	useEffect(() => {
		loadDebt();
	}, []);

	const loadDebt = async () => {
		setIsLoadingDebt(true);
		const debt = await getCurrentDebt();
		setCurrentDebt(debt);
		setIsLoadingDebt(false);
	};

	// Handle count changes for denominations
	const handleCountChange = (denomination: number, value: string) => {
		const count = parseInt(value) || 0;
		setCounts(prev => ({
			...prev,
			[denomination]: count
		}));
	};

	// Calculate total cash
	const totalCash = Object.entries(counts).reduce((total, [denom, count]) => {
		return total + (parseInt(denom) * count);
	}, 0);

	// Reset form
	const resetForm = () => {
		setCounts({
			200: 0,
			100: 0,
			50: 0,
			20: 0,
			10: 0,
			5: 0,
			2: 0,
			1: 0
		});
		setDebtInput('');
	};

	// Handle debt operations
	const addDebt = async () => {
		const amount = parseFloat(debtInput) || 0;
		if (amount > 0) {
			const newDebt = currentDebt + amount;
			await updateDebt(newDebt);
			setCurrentDebt(newDebt);
			setDebtInput('');
		}
	};

	const payDebt = async () => {
		const amount = parseFloat(debtInput) || 0;
		if (amount > 0) {
			const newDebt = Math.max(0, currentDebt - amount);
			await updateDebt(newDebt);
			setCurrentDebt(newDebt);
			setDebtInput('');
		}
	};

	return (
		<div className="max-w-7xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-900">{t('nav.money')}</h1>
				<button
					onClick={resetForm}
					className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center hover:bg-gray-200 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				>
					<RefreshCw className="h-4 w-4 mr-2" />
					{t('money.reset')}
				</button>
			</div>

			{/* Main Layout - Two Columns */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
				{/* Left Column - Cash Calculator */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
						<div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
							<div className="flex items-center justify-center">
								<Calculator className="h-6 w-6 text-blue-600 mr-3" />
								<h2 className="text-xl font-semibold text-gray-900">{t('money.cash')}</h2>
							</div>
							<p className="text-center text-gray-600 text-sm mt-2">
								{t('money.cash.subtitle')}
							</p>
						</div>

						<div className="p-8">
							{/* Denominations Grid */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
								{/* 200 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-200" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											200 DH
										</label>
										<input
											id="denom-200"
											type="number"
											min="0"
											value={counts[200]}
											onChange={(e) => handleCountChange(200, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(200 * counts[200]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 100 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-100" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											100 DH
										</label>
										<input
											id="denom-100"
											type="number"
											min="0"
											value={counts[100]}
											onChange={(e) => handleCountChange(100, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(100 * counts[100]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 50 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-50" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											50 DH
										</label>
										<input
											id="denom-50"
											type="number"
											min="0"
											value={counts[50]}
											onChange={(e) => handleCountChange(50, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(50 * counts[50]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 20 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-20" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											20 DH
										</label>
										<input
											id="denom-20"
											type="number"
											min="0"
											value={counts[20]}
											onChange={(e) => handleCountChange(20, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(20 * counts[20]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 10 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-10" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											10 DH
										</label>
										<input
											id="denom-10"
											type="number"
											min="0"
											value={counts[10]}
											onChange={(e) => handleCountChange(10, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(10 * counts[10]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 5 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-5" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											5 DH
										</label>
										<input
											id="denom-5"
											type="number"
											min="0"
											value={counts[5]}
											onChange={(e) => handleCountChange(5, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(5 * counts[5]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 2 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-2" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											2 DH
										</label>
										<input
											id="denom-2"
											type="number"
											min="0"
											value={counts[2]}
											onChange={(e) => handleCountChange(2, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(2 * counts[2]).toFixed(2)} DH
										</div>
									</div>
								</div>

								{/* 1 DH */}
								<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group">
									<div className="text-center">
										<label htmlFor="denom-1" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
											1 DH
										</label>
										<input
											id="denom-1"
											type="number"
											min="0"
											value={counts[1]}
											onChange={(e) => handleCountChange(1, e.target.value)}
											className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
										/>
										<div className="mt-3 text-base font-bold text-emerald-600">
											{(1 * counts[1]).toFixed(2)} DH
										</div>
									</div>
								</div>
							</div>

							{/* Total Display */}
							<div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
								<div className="flex items-center justify-between">
									<div className="flex items-center">
										<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
											<DollarSign className="h-8 w-8" />
										</div>
										<div>
											<span className="text-2xl font-bold">{t('money.total')}</span>
											<p className="text-emerald-100 text-sm mt-1">{t('money.total.subtitle')}</p>
										</div>
									</div>
									<div className="text-4xl font-black">
										{totalCash.toFixed(2)} DH
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Debt Counter */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
						<div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
							<div className="flex items-center justify-center">
								<TrendingDown className="h-6 w-6 text-red-600 mr-3" />
								<h2 className="text-xl font-semibold text-gray-900">{t('money.debt')}</h2>
							</div>
							<p className="text-center text-gray-600 text-sm mt-2">
								{t('money.debt.subtitle')}
							</p>
						</div>

						<div className="p-6 space-y-5 pt-10">
							{/* Current Debt Display */}
							<div className={`${currentDebt > 0
								? 'bg-gradient-to-br from-red-500 via-pink-600 to-rose-600'
								: 'bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600'
								} text-white rounded-3xl p-16 text-center shadow-lg transition-all duration-300`}>
								<div className="flex items-center justify-center mb-2">
									<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-2 backdrop-blur-sm">
										{currentDebt > 0 ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
									</div>
									<span className="text-lg font-bold">{t('money.current.debt')}</span>
								</div>
								<div className="text-3xl font-black">
                                {isLoadingDebt ? <LoadingSpinner /> : `${currentDebt.toFixed(2)} DH`}
                            </div>
                            <p className="text-sm mt-2 opacity-90 font-medium">
                                {!isLoadingDebt && currentDebt === 0 ? `${t('money.debt.free')} 🎉` : ''}
                            </p>
							</div>

							{/* Debt Input */}
							<div>
								<label htmlFor="debtInput" className="block text-sm font-bold text-gray-700 mb-3">
									{t('money.amount')}
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<span className="text-gray-600 text-sm font-semibold">DH</span>
									</div>
									<input
										id="debtInput"
										type="number"
										min="0"
										step="0.01"
										placeholder="0.00"
										value={debtInput}
										onChange={(e) => setDebtInput(e.target.value)}
										className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-30 focus:border-blue-500 transition-all duration-200 text-base font-semibold bg-gray-50 focus:bg-white shadow-inner text-gray-700"
									/>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="space-y-4">
								<button
									onClick={addDebt}
									className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
								>
									<Plus className="h-5 w-5 mr-2" />
									{t('money.add.debt')}
								</button>

								<button
									onClick={payDebt}
									className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
								>
									<Minus className="h-5 w-5 mr-2" />
									{t('money.pay.debt')}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoneyCalculation;