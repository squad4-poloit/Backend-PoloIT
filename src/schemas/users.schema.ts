import { z } from "zod";

export const GetUsersSchema = z.object({
	query: z.object({
		page: z.coerce.number().nonnegative().min(1).default(1),
		limit: z.coerce.number().nonnegative().multipleOf(5).max(50).default(5),
		role: z.string().optional(),
		institution: z.string().optional(),
		skill: z.string().optional(),
	}),
});

export const GetUserSchema = z.object({
	params: z.object({
		id: z.string().uuid(),
	}),
});

export const PostUserSchema = z.object({
	body: z.object({}),
});

export type GetUsersQueryType = z.infer<typeof GetUsersSchema>["query"];
