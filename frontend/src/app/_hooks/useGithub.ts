import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

export const useGithub = (token: string | null) => {
	const { data: octokit } = useQuery({
		queryFn: () => new Octokit({ auth: token }),
		queryKey: ["github-auth", token],
		enabled: !!token,
	});

	return octokit;
};
