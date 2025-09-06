"use client";

import { useGithubRepos } from "../_hooks/useGithubRepos";
import { useGithubUser } from "../_hooks/useGithubUser";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { Form } from "./Form";

export function GithubFakeAuth() {
	const { store, value: token } = useLocalStorage("GITHUB_TOKEN");

	const user = useGithubUser(token);

	if (!token)
		return (
			<div className="rounded-xl bg-background p-4">
				Copy token from <pre>gh auth token</pre>
				<Form title="Input token" handleSubmit={(value) => store(value)} />
			</div>
		);

	return <>{user?.login}</>;
}

export default function RepoSelector() {
	const { data: repos } = useGithubRepos();

	return (
		<pre>
			<GithubFakeAuth />

			{repos?.length && repos.map((repo) => <div key={repo.id}>{repo.id}</div>)}
			{!repos?.length && <div>no repos</div>}
		</pre>
	);
}

export { RepoSelector };
