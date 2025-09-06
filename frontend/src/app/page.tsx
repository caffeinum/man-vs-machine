import { SignIn } from "@stackframe/stack";
import { Header } from "~/components/ui/header";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b to-[#01ffb7] from-[#ffe6ac]">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<Header />
					<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
						Welcome
					</h1>

					<SignIn />
				</div>
			</main>
		</HydrateClient>
	);
}
