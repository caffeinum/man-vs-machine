import { useLocalStorage } from "./useLocalStorage";

export const useGithubFakeAuth = () => {
  const { value: token } = useLocalStorage("GITHUB_TOKEN");

  console.log("github auth", token);

  return token;
};
