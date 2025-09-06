import { SignIn } from "@stackframe/stack";
import { UserButton } from "@stackframe/stack";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#01ffb7] to-[#15162c] text-white">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
						Welcome
					</h1>

					<SignIn />
					<UserButton />
				</div>
			</main>
		</HydrateClient>
	);
}
