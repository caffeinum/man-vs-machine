import { useQuery } from "@tanstack/react-query";
import { getAPI, getHealth, getIssues } from "../_service/api";
import type { METHOD } from "../_service/schemas";

export const useAPI = (
	method: "GET" | "POST" | "PUT" | "DELETE",
	path: METHOD,
	params: Record<string, string> = {},
) => {
	return useQuery({
		queryFn: () => getAPI(method, path, params),
		queryKey: ["api", path, ...Object.values(params).join()],
	});
};

export const useHealth = () => {
	return useQuery({
		queryFn: () => getHealth(),
		queryKey: ["api", "health"],
	});
};

export const useIssues = (user: string, repo: string) => {
	return useQuery({
		queryFn: async () => {
			const response = await getIssues(user, repo);

			console.log("response", response);

			return response;
		},

		queryKey: ["api", "issues", user, repo],
	});
};
