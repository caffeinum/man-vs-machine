"use client";

import { useGithubRepos } from "../_hooks/useGithubRepos";
import { GithubFakeAuth } from "./GithubFakeAuth";

export default function RepoSelector() {
	const { data: repos, error } = useGithubRepos();

	return (
		<pre>
			<GithubFakeAuth />

			{error && <div>{error.message}</div>}
			{repos?.length && repos.map((repo) => <div key={repo.id}>{repo.id}</div>)}
			{!repos?.length && <div>no repos</div>}
		</pre>
	);
}

export { RepoSelector };
