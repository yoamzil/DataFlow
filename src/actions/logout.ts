"use server";
import { cookies } from "next/headers";

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.set("isAuthenticated", "", { path: "/", expires: new Date(0) });
}
