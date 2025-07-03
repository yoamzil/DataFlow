// src/hooks/useAuthGuard.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
	const router = useRouter();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const isAuthenticated = document.cookie
			.split("; ")
			.some((cookie) => cookie === "isAuthenticated=true");
		if (!isAuthenticated) {
			router.replace("/login");
		} else {
			setChecked(true);
		}
	}, [router]);

	return checked;
}
