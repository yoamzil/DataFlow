// src/actions/logout.ts
"use server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function logout() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken")?.value;

	if (sessionToken) {
		await prisma.admin.updateMany({
			where: { sessionToken },
			data: { sessionToken: null },
		});
	}

	cookieStore.set("sessionToken", "", {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		maxAge: 0,
	});
}
