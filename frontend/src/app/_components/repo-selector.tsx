"use client";

import { useQuery } from "@tanstack/react-query";
import { useGithub } from "../_hooks/useGithub";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { Form } from "./Form";

export function GithubFakeAuth() {
	const { store, value: token } = useLocalStorage("GITHUB_TOKEN");

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

	console.log("data", user);

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
	return (
		<pre>
			<GithubFakeAuth />
		</pre>
	);
}

export { RepoSelector };
