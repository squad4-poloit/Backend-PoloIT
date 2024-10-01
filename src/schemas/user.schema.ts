import { z } from "zod";

const GetUserListSchema = z.object({
	query: z.object({
		page: z.number(),
		limit: z.number(),
		role: z.string(),
		institution: z.string(),
		skill: z.string(),
	}),
});

export type GetUserListQueryType = z.infer<typeof GetUserListSchema>["query"];
