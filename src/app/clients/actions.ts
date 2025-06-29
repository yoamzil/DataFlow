"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

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
}) {
	const existing = await prisma.client.findFirst({
		where: { idCard: data.idCard },
	});
	if (existing) {
		if (existing.name !== data.name || existing.phone !== data.phone) {
			throw new Error("Client with this ID card already exists with different name or phone.");
		}
	}
	const result = await prisma.client.create({
		data: {
			...data,
			date: new Date(data.date),
		},
	});
	revalidatePath("/clients");
	return result;
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
	}
) {
	const existing = await prisma.client.findFirst({
		where: { idCard: data.idCard, id: { not: id } },
	});
	if (existing) {
		if (existing.name !== data.name || existing.phone !== data.phone) {
			throw new Error("Client with this ID card already exists with different name or phone.");
		}
	}
	const result = await prisma.client.update({
		where: { id },
		data: {
			...data,
			date: new Date(data.date),
		},
	});
	revalidatePath("/clients");
	return result;
}

export async function deleteClient(id: number) {
	const result = await prisma.client.delete({
		where: { id },
	});
	revalidatePath("/clients");
	return result;
}
