"use server";
import { cookies } from "next/headers";

export async function setLanguageCookie(lang: "en" | "fr") {
	const cookieStore = await cookies();
	cookieStore.set("language", lang, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
	});
}
