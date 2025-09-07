"use client";

import KanbanBoard, { type Column, type Task } from "~/app/_components/board";
import { useIssues } from "~/app/_hooks/useAPI";
import { Alert } from "~/components/ui/alert";

const sampleData: Column[] = [
	{
		id: "todo",
		title: "To Do",
		color: "#8B7355",
		tasks: [
			{
				id: "1",
				title: "Design System Audit",
				description: "Review and update component library",
				priority: "high",
				assignee: {
					name: "Sarah Chen",
					avatar: "/headshot/Lummi Doodle 02.png",
				},
				tags: ["Design", "System"],
				dueDate: "2024-01-15",
				attachments: 3,
				comments: 7,
			},
			{
				id: "2",
				title: "User Research Analysis",
				description: "Analyze feedback from recent user interviews",
				priority: "medium",
				assignee: {
					name: "Alex Rivera",
					avatar: "/headshot/Lummi Doodle 04.png",
				},
				tags: ["Research", "UX"],
				dueDate: "2024-01-18",
				comments: 4,
			},
		],
	},
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
	const { data: issues, error } = useIssues(user, repo);

	console.log("issues", issues);

	const columnData: Column[] = sampleData.map((column) => {
		if (column.id === "todo") {
			const tasks: Task[] =
				issues?.map(
					(issue) =>
						({
							id: issue.id.toString(),
							title: issue.title,
						}) satisfies Task,
				) ?? [];
			return { ...column, tasks: tasks };
		}
		return column;
	});

	const handleDrop = (taskId: number) => {
		console.log("dragged task", taskId);
	};

	if (error) {
		return <Alert>{error.message}</Alert>;
	}

	return <KanbanBoard columnData={columnData} onDrop={handleDrop} />;
}
