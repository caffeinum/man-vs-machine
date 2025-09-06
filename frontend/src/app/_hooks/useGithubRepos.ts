import { useQuery } from "@tanstack/react-query";
import { useGithub } from "./useGithub";
import { useGithubFakeAuth } from "./useGithubFakeAuth";

export const useGithubRepos = () => {
  const authToken = useGithubFakeAuth();

  const { data: octokit } = useGithub(authToken);

  return useQuery({
    queryFn: async () => {
      if (!octokit) throw new Error();
      const { data: repos } = await octokit.rest.repos.listForUser();

      return repos;
    },
    queryKey: ["github-auth", authToken],
    enabled: !!authToken,
  });
};
