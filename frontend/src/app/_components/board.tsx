"use client";

import {
	Calendar,
	GripVertical,
	MessageCircle,
	Paperclip,
	Plus,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";

interface Task {
	id: string;
	title: string;
	description?: string;
	priority?: "low" | "medium" | "high";
	assignee?: {
		name: string;
		avatar: string;
	};
	tags?: string[];
	dueDate?: string;
	attachments?: number;
	comments?: number;
}

interface Column {
	id: string;
	title: string;
	tasks: Task[];
	color?: string;
}

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

export default function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>(sampleData);

	const handleDragStart = (
		e: React.DragEvent,
		task: Task,
		columnId: string,
	) => {
		e.dataTransfer.setData(
			"text/plain",
			JSON.stringify({ task, sourceColumnId: columnId }),
		);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
		e.preventDefault();
		const data = JSON.parse(e.dataTransfer.getData("text/plain"));
		const { task, sourceColumnId } = data;

		if (sourceColumnId === targetColumnId) return;

		setColumns((prev) =>
			prev.map((col) => {
				if (col.id === sourceColumnId) {
					return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) };
				}
				if (col.id === targetColumnId) {
					return { ...col, tasks: [...col.tasks, task] };
				}
				return col;
			}),
		);
	};

	return (
		<div className="">
			<div className="mb-8 text-center">
				<h1 className="mb-2 font-light text-4xl text-neutral-900 dark:text-neutral-100">
					Kanban Board
				</h1>
				<p className="text-neutral-700 dark:text-neutral-300">
					Drag and drop task management
				</p>
			</div>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
				{columns.map((column) => (
					<div
						key={column.id}
						className="rounded-3xl border border-border bg-white/20 p-5 backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/20"
						onDragOver={handleDragOver}
						onDrop={(e) => handleDrop(e, column.id)}
					>
						<div className="mb-6 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div
									className="h-4 w-4 rounded-full "
									style={{ backgroundColor: column.color }}
								/>
								<h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
									{column.title}
								</h3>
								<Badge className="border-neutral-200/50 bg-neutral-100/80 text-neutral-800 dark:border-neutral-600/50 dark:bg-neutral-800/80 dark:text-neutral-200">
									{column.tasks.length}
								</Badge>
							</div>
							<button
								type="button"
								className="rounded-full bg-white/30 p-1 transition-colors hover:bg-white/50 dark:bg-neutral-800/30 dark:hover:bg-neutral-700/50"
							>
								<Plus className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
							</button>
						</div>

						<div className="space-y-4">
							{column.tasks.map((task) => (
								<Card
									key={task.id}
									className="cursor-move border bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:bg-neutral-800/60 dark:hover:bg-neutral-700/70"
									draggable
									onDragStart={(e) => handleDragStart(e, task, column.id)}
								>
									<CardContent className="p-5">
										<div className="space-y-4">
											<div className="flex items-start justify-between">
												<h4 className="font-semibold text-neutral-900 leading-tight dark:text-neutral-100">
													{task.title}
												</h4>
												<GripVertical className="h-5 w-5 cursor-move text-neutral-500 dark:text-neutral-400" />
											</div>

											{task.description && (
												<p className="text-neutral-700 text-sm leading-relaxed dark:text-neutral-300">
													{task.description}
												</p>
											)}

											{task.tags && (
												<div className="flex flex-wrap gap-2">
													{task.tags.map((tag) => (
														<Badge
															key={tag}
															className="border-neutral-200/50 bg-neutral-100/60 text-neutral-800 text-xs backdrop-blur-sm dark:border-neutral-600/50 dark:bg-neutral-700/60 dark:text-neutral-200"
														>
															{tag}
														</Badge>
													))}
												</div>
											)}

											<div className="flex items-center justify-between border-neutral-200/30 border-t pt-2 dark:border-neutral-700/30">
												<div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
													{task.dueDate && (
														<div className="flex items-center gap-1">
															<Calendar className="h-4 w-4" />
															<span className="font-medium text-xs">
																Jan 15
															</span>
														</div>
													)}
													{task.comments && (
														<div className="flex items-center gap-1">
															<MessageCircle className="h-4 w-4" />
															<span className="font-medium text-xs">
																{task.comments}
															</span>
														</div>
													)}
													{task.attachments && (
														<div className="flex items-center gap-1">
															<Paperclip className="h-4 w-4" />
															<span className="font-medium text-xs">
																{task.attachments}
															</span>
														</div>
													)}
												</div>

												{task.assignee && (
													<Avatar className="h-8 w-8 ring-2 ring-white/50 dark:ring-neutral-700/50">
														<AvatarImage src={task.assignee.avatar} />
														<AvatarFallback className="bg-neutral-200 font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
															{task.assignee.name
																.split(" ")
																.map((n) => n[0])
																.join("")}
														</AvatarFallback>
													</Avatar>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
