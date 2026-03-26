// lib/requireAuth.ts
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function requireAuth() {
	const cookieStore = await cookies();
	const sessionToken = cookieStore.get("sessionToken")?.value;
	if (!sessionToken) redirect("/login");

	const admin = await prisma.admin.findFirst({
		where: { sessionToken },
	});

	if (!admin) redirect("/login");
}
