"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ClientActionResult = {
	ok: boolean;
	code?: "ID_CARD_NAME_CONFLICT";
};

export async function getClients() {
	return prisma.client.findMany({
		orderBy: { date: "desc" },
	});
}

export async function addClient(data: {
	idCard: string;
	name: string;
	phone: string;
	date: string;
	amount: number;
	duration: number;
	fileId: string;
	company: string;
}): Promise<ClientActionResult> {
	const existing = await prisma.client.findFirst({
		where: { idCard: data.idCard },
	});
	if (existing) {
		if (existing.name !== data.name) {
			return { ok: false, code: "ID_CARD_NAME_CONFLICT" };
		}
	}
	await prisma.client.create({
		data: {
			...data,
			date: new Date(data.date),
		},
	});
	revalidatePath("/clients");
	return { ok: true };
}

export async function updateClient(
	id: number,
	data: {
		name: string;
		idCard: string;
		phone: string;
		date: string;
		amount: number;
		duration: number;
		fileId: string;
		company: string;
	},
): Promise<ClientActionResult> {
	const existing = await prisma.client.findFirst({
		where: { idCard: data.idCard, id: { not: id } },
	});
	if (existing) {
		if (existing.name !== data.name) {
			return { ok: false, code: "ID_CARD_NAME_CONFLICT" };
		}
	}
	await prisma.client.update({
		where: { id },
		data: {
			...data,
			date: new Date(data.date),
		},
	});
	revalidatePath("/clients");
	return { ok: true };
}

export async function deleteClient(id: number) {
	const result = await prisma.client.delete({
		where: { id },
	});
	revalidatePath("/clients");
	return result;
}
