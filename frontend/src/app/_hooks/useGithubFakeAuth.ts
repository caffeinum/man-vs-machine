import { useLocalStorage } from "./useLocalStorage";

export const useGithubFakeAuth = () => {
  const { value: token } = useLocalStorage("GITHUB_TOKEN");

  return token;
};
