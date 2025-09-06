"use client";
import { useGithubUser } from "../_hooks/useGithubUser";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { Form } from "./Form";

export function GithubFakeAuth() {
	const { store, value: token } = useLocalStorage("GITHUB_TOKEN");

	const { data: user } = useGithubUser();

	if (!token)
		return (
			<div className="rounded-xl bg-background p-4">
				Copy token from <pre>gh auth token</pre>
				<Form title="Input token" handleSubmit={(value) => store(value)} />
			</div>
		);

	return <>{user?.login}</>;
}
