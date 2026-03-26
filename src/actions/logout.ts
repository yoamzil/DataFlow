// src/actions/logout.ts
"use server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

	redirect("/login");
}
