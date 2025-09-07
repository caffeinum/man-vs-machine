import { SignIn } from "@stackframe/stack";
import { Header } from "~/components/ui/header";
import { HydrateClient } from "~/trpc/server";
import RepoSelector from "./_components/repo-selector";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffe6ac] to-[#01ffb7]">
				<Header />

				<div className="container mt-10 flex flex-col items-center justify-center gap-6 px-4 py-16">
					<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
						Welcome
					</h1>

					<RepoSelector />
				</div>
			</main>
		</HydrateClient>
	);
}
