import { useQuery } from "@tanstack/react-query";
import { useGithub } from "./useGithub";
import { useGithubFakeAuth } from "./useGithubFakeAuth";

export const useGithubUser = () => {
  const authToken = useGithubFakeAuth();
  const octokit = useGithub(authToken);

  const { data: user } = useQuery({
    enabled: !!authToken && !!octokit,
    queryKey: ["user", authToken],
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
