"use server";

import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getClients() {
	return prisma.client.findMany({
		orderBy: { date: "asc" },
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
