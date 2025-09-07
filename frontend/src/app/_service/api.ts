import { z } from "zod";
import { HealthSchema, IssuesSchema } from "./schemas";

export const API_URL = "http://localhost:8080";

export const getHealth = async () => {
	const data = await getAPI("GET", "/health");

	return HealthSchema.parse(data);
};

export const getIssues = async (user: string, repo: string) => {
	const response = await getAPI("GET", `/${user}/${repo}/issues`);

	return IssuesSchema.parse(response);
};

export const getAPI = async (
	method: "GET" | "POST" | "PUT" | "DELETE",
	path: string,
	params: Record<string, string> = {},
) => {
	const authToken = localStorage.getItem("GITHUB_TOKEN");

	if (!authToken) {
		throw new Error("No auth token");
	}

	const response = await fetch(API_URL + path, {
		method,
		headers: {
			Authorization: `Bearer ${authToken}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		...(method === "GET"
			? {}
			: {
					body: JSON.stringify(params),
				}),
	});

	const json = await response.json();

	console.log("json", json);

	const { status, message } = z
		.object({
			status: z.literal("success"),
			message: z.unknown(),
		})
		.parse(json);

	if (status !== "success") {
		throw new Error(JSON.stringify(json));
	}

	return message;
};
