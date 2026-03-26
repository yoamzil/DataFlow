// src/actions/auth.ts
"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function login(password: string): Promise<boolean> {
	const admin = await prisma.admin.findFirst();
	if (!admin) return false;

	const match = await bcrypt.compare(password, admin.hashedPassword);
	if (!match) return false;

	// Generate secure random token
	const sessionToken = crypto.randomBytes(32).toString("hex");

	// Store in DB
	await prisma.admin.update({
		where: { id: admin.id },
		data: { sessionToken },
	});

	// Store in secure cookie
	const cookieStore = await cookies();
	cookieStore.set("sessionToken", sessionToken, {
		httpOnly: true,
		sameSite: "strict",
		path: "/",
		maxAge: 24 * 60 * 60, // 24 hours in seconds
	});

	return true;
}
