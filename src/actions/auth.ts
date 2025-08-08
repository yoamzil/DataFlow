// src/actions/auth.ts
"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import crypto from "crypto";

const prisma = new PrismaClient();

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

	// Get auto-lock settings to determine session duration
	const cookieStore = await cookies();
	const autoLockSettings = cookieStore.get("autoLockSettings")?.value;

	// Default to 24 hours, but use auto-lock duration if enabled
	let maxAge = 24 * 60 * 60; // 24 hours in seconds

	if (autoLockSettings) {
		try {
			const settings = JSON.parse(autoLockSettings);
			if (settings.enabled && settings.duration) {
				maxAge = settings.duration * 60; // Convert minutes to seconds
			}
		} catch (error) {
			console.error("Failed to parse auto-lock settings:", error);
		}
	}

	// Store in secure cookie
	cookieStore.set("sessionToken", sessionToken, {
		httpOnly: true,
		sameSite: "strict",
		path: "/",
		maxAge: maxAge, // 24 hours in seconds
	});

	return true;
}
