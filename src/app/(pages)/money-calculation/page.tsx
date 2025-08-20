import { requireAuth } from "@/lib/requireAuth";
import MoneyCalculation from "./MoneyPage";

export default async function Settings() {
	await requireAuth();
	return <MoneyCalculation />;
}