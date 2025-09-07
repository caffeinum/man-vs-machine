import { z } from "zod";

export const HealthSchema = z.string();

//   {
// 	"id": 3389661437,
// 	"number": 2,
// 	"title": "🚀 Integrate Real PostHog API Data - Fix Dashboard Demo Data Issue",
// 	"state": "open",
// 	"html_url": "https://github.com/makedora/posthog-mobile-app-integration/pull/2",
// 	"user": "caffeinum",
// 	"labels": [],
// 	"assignees": [],
// 	"created_at": "2025-09-06T08:31:35Z",
// 	"updated_at": "2025-09-06T08:31:35Z"
//   }
export const IssuesSchema = z.array(
	z.object({
		id: z.number(),
		number: z.number(),
		title: z.string(),
		// body: z.string(),
		// user: z.string(),
		// labels: z.array(z.string()),
		// created_at: ZodISODateTime,
		// updated_at: ZodISODateTime,
	}),
);

export type METHOD = "/health" | "/:user/:repo/issues";
