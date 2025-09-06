import { useQuery } from "@tanstack/react-query";
import { useGithub } from "./useGithub";
import { useGithubFakeAuth } from "./useGithubFakeAuth";

export const useGithubRepos = () => {
  const authToken = useGithubFakeAuth();
  const octokit = useGithub(authToken);

  return useQuery({
    queryFn: async () => {
      if (!octokit) throw new Error("Cant list repos");

      const { data: repos } =
        await octokit.rest.repos.listForAuthenticatedUser();

      return repos;
    },
    queryKey: ["github-repos", authToken],
    enabled: !!authToken,
  });
};
