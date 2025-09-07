import { HydrateClient } from "~/trpc/server";
import { AgentsBoard } from "./agents-board";

export default async function Home({
	params,
}: { params: Promise<{ user: string; repo: string }> }) {
	const { user, repo } = await params;

	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffd190] to-[#fffff4]">
				<div>
					<h1>
						we are at {user}/{repo}
					</h1>
				</div>
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<AgentsBoard user={user} repo={repo} />
				</div>
			</main>
		</HydrateClient>
	);
}
