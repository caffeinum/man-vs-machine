import { Alert } from "~/components/ui/alert";
import { useHealth } from "../_hooks/useAPI";

export function HealthCheck() {
	const { data: test, error } = useHealth();

	if (error) {
		return <Alert>{error.message}</Alert>;
	}

	if (!test) {
		return <Alert>Empty server response</Alert>;
	}

	return (
		<div
			className="inline-block h-4 w-4 rounded-full"
			style={{
				backgroundColor: test === "ok" ? "green" : "yellow",
			}}
		/>
	);
}
