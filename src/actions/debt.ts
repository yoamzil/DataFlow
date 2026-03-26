"use server";

import { prisma } from "@/lib/prisma";

// Get current debt (there's only one record)
export async function getCurrentDebt(): Promise<number> {
	try {
		let debtRecord = await prisma.debt.findFirst();

		// If no debt record exists, create one with 0
		if (!debtRecord) {
			debtRecord = await prisma.debt.create({ data: { amount: 0 } });
		}

		return debtRecord.amount;
	} catch (error) {
		console.error("Error getting debt:", error);
		return 0;
	}
}

// Update debt amount
export async function updateDebt(
	newAmount: number
): Promise<{ success: boolean; error?: string }> {
	try {
		// Find the first (and only) debt record
		const debtRecord = await prisma.debt.findFirst();

		if (debtRecord) {
			// Update existing record
			await prisma.debt.update({
				where: { id: debtRecord.id },
				data: { amount: Math.max(0, newAmount) }, // Never allow negative debt
			});
		} else {
			// Create new record
			await prisma.debt.create({
				data: { amount: Math.max(0, newAmount) },
			});
		}

		return { success: true };
	} catch (error) {
		console.error("Error updating debt:", error);
		return { success: false, error: "Failed to update debt" };
	}
}
