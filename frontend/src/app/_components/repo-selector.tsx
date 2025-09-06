"use client";

import { Alert } from "~/components/ui/alert";
import { useGithubRepos } from "../_hooks/useGithubRepos";
import { GithubFakeAuth } from "./GithubFakeAuth";

export default function RepoSelector() {
	const { data: repos, error } = useGithubRepos();

	return (
		<pre>
			<GithubFakeAuth />

			{error && <Alert>{error.message}</Alert>}
			{repos?.length && repos.map((repo) => <div key={repo.id}>{repo.id}</div>)}
			{!repos?.length && <div>no repos</div>}
		</pre>
	);
}

export { RepoSelector };
