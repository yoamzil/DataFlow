"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function changePassword(
	currentPassword: string,
	newPassword: string
): Promise<{ success: boolean; error?: string }> {
	try {
		// Get the session token from cookies
		const cookieStore = await cookies();
		const sessionToken = cookieStore.get("sessionToken")?.value;

		if (!sessionToken) {
			return { success: false, error: "Not authenticated" };
		}

		// Find admin by session token
		const admin = await prisma.admin.findFirst({
			where: { sessionToken },
		});

		if (!admin) {
			return { success: false, error: "Not authenticated" };
		}

		// Verify current password
		const currentPasswordMatch = await bcrypt.compare(
			currentPassword,
			admin.hashedPassword
		);
		if (!currentPasswordMatch) {
			return { success: false, error: "Current password is incorrect" };
		}

		// Hash the new password
		const saltRounds = 12;
		const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

		// Update the password in the database
		await prisma.admin.update({
			where: { id: admin.id },
			data: { hashedPassword: newHashedPassword },
		});

		return { success: true };
	} catch (error) {
		console.error("Password change error:", error);
		return {
			success: false,
			error: "An error occurred while changing password",
		};
	}
}
