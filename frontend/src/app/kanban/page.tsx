import { HydrateClient } from "~/trpc/server";
import KanbanBoard from "../_components/board";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffd190] to-[#fffff4] text-white">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
					<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
						Agents Kanban
					</h1>

					<KanbanBoard />
				</div>
			</main>
		</HydrateClient>
	);
}
