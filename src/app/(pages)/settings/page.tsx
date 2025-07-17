import { requireAuth } from "@/lib/requireAuth";
import SettingsPage from "./SettingsPage";

export default async function Settings() {
	await requireAuth();
	return <SettingsPage />;
}