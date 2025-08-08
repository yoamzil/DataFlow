"use server";
import { cookies } from "next/headers";

export async function updateAutoLockSettings(settings: {
	enabled: boolean;
	duration: number;
}) {
	const cookieStore = await cookies();

	// Store settings in cookie
	cookieStore.set("autoLockSettings", JSON.stringify(settings), {
		httpOnly: true,
		sameSite: "strict",
		path: "/",
		maxAge: 365 * 24 * 60 * 60, // 1 year
	});

	// Update current session cookie with new expiration
	const currentSessionToken = cookieStore.get("sessionToken")?.value;

	if (currentSessionToken) {
		// Calculate new maxAge based on settings
		const newMaxAge = settings.enabled
			? settings.duration * 60 // Convert minutes to seconds
			: 24 * 60 * 60; // Default 24 hours if disabled

		// Update the existing session cookie with new expiration
		cookieStore.set("sessionToken", currentSessionToken, {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
			maxAge: newMaxAge,
		});
	}

	return { success: true };
}

export async function getAutoLockSettings() {
	const cookieStore = await cookies();
	const settings = cookieStore.get("autoLockSettings")?.value;

	if (settings) {
		try {
			return JSON.parse(settings);
		} catch (error) {
			console.error("Failed to parse auto-lock settings:", error);
		}
	}

	return { enabled: false, duration: 10 };
}
