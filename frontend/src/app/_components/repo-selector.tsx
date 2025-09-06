"use client";

import Link from "next/link";
import { Alert } from "~/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
	ListGroup,
	ListHeader,
	ListItem,
	ListItems,
} from "~/components/ui/list";
import { useGithubRepos } from "../_hooks/useGithubRepos";
import { GithubFakeAuth } from "./GithubFakeAuth";

export default function RepoSelector() {
	const { data: repos, error } = useGithubRepos();

	return (
		<pre>
			<GithubFakeAuth />

			{error && <Alert>{error.message}</Alert>}
			{!repos?.length && <Alert>No repos access</Alert>}

			{repos?.length && (
				<div className="max-h-[50vh] overflow-auto">
					<ListGroup id="repos">
						<ListHeader name={"User repos"} color={"cyan"} />
						<ListItems>
							{repos.map((repo, index) => (
								<Link
									key={repo.id}
									href={`/kanban/${repo.owner.login}/${repo.name}/`}
								>
									<ListItem
										id={repo.id.toString()}
										name={repo.name}
										parent={"repos"}
										index={index}
									>
										{repo.owner && (
											<Avatar className="h-4 w-4 shrink-0">
												<AvatarImage src={repo.owner.avatar_url} />
												<AvatarFallback>
													{repo.owner.name?.slice(0, 2)}
												</AvatarFallback>
											</Avatar>
										)}
										<p className="m-0 flex-1 font-medium text-sm">
											{repo.name}
										</p>
									</ListItem>
								</Link>
							))}
						</ListItems>
					</ListGroup>
				</div>
			)}
		</pre>
	);
}

export { RepoSelector };
