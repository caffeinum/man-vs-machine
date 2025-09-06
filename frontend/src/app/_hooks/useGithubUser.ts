import { useQuery } from "@tanstack/react-query";
import { useGithub } from "./useGithub";

export const useGithubUser = (token: string | null) => {
	const { data: octokit } = useGithub(token);

	const { data: user } = useQuery({
		enabled: !!token && !!octokit,
		queryKey: ["user", token],
		queryFn: async () => {
			if (!octokit) throw new Error("not auth");

			const { data } = await octokit.rest.users.getAuthenticated();
			if (!data) {
				throw new Error("Request failed");
			}
			return data;
		},
	});

	return user;
};
