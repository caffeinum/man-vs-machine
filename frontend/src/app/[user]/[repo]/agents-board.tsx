"use client";

import { useMutation } from "@tanstack/react-query";
import KanbanBoard, { type Column, type Task } from "~/app/_components/board";
import { useIssues } from "~/app/_hooks/useAPI";
import { createAgent } from "~/app/_service/api";
import Loading from "~/app/loading";
import { Alert } from "~/components/ui/alert";

const otherColumns: Column[] = [
	{
		id: "progress",
		title: "In Progress",
		color: "#6B8E23",
		tasks: [
			{
				id: "3",
				title: "Mobile App Redesign",
				description: "Implementing new navigation patterns",
				priority: "high",
				assignee: {
					name: "Jordan Kim",
					avatar: "/headshot/Lummi Doodle 06.png",
				},
				tags: ["Mobile", "UI"],
				attachments: 8,
				comments: 12,
			},
		],
	},
	{
		id: "review",
		title: "Review",
		color: "#CD853F",
		tasks: [
			{
				id: "4",
				title: "API Documentation",
				description: "Complete developer documentation",
				priority: "medium",
				assignee: {
					name: "Maya Patel",
					avatar: "/headshot/Lummi Doodle 09.png",
				},
				tags: ["Documentation", "API"],
				dueDate: "2024-01-20",
				comments: 2,
			},
		],
	},
	{
		id: "done",
		title: "Done",
		color: "#556B2F",
		tasks: [
			{
				id: "5",
				title: "Landing Page Optimization",
				description: "Improved conversion rate by 23%",
				priority: "low",
				assignee: {
					name: "Chris Wong",
					avatar: "/headshot/Lummi Doodle 10.png",
				},
				tags: ["Marketing", "Web"],
				attachments: 2,
				comments: 8,
			},
		],
	},
];

export function AgentsBoard({ user, repo }: { user: string; repo: string }) {
	const { data: issues, isPending, error } = useIssues(user, repo);

	console.log("issues", issues);

	const { mutate: startAgent } = useMutation({
		mutationFn: async (id: number) => {
			const res = await createAgent(user, repo, id);

			return res;
		},
	});

	const columnData: Column[] = [
		{
			id: "todo",
			title: "Backlog (drag to start)",
			color: "#8B7355",
			tasks:
				issues?.map(
					(issue) =>
						({
							id: issue.id.toString(),
							title: issue.title,
						}) satisfies Task,
				) ?? [],
		},
		...otherColumns,
	];

	const handleDrop = (columnId: string, taskId: number) => {
		console.log("dragged task", taskId);

		if (columnId !== "todo") {
			startAgent(taskId);
		}
	};

	if (error) {
		return <Alert>{error.message}</Alert>;
	}

	if (isPending) {
		return <Loading />;
	}

	return (
		<div>
			<h3>Loaded {issues?.length} issues</h3>
			<KanbanBoard columnData={columnData} onDrop={handleDrop} />
		</div>
	);
}
