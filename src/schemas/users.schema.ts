import { z } from "zod";

export const GetUsersSchema = z.object({
	query: z.object({
		page: z.coerce.number().int().nonnegative().min(1).default(1),
		limit: z.coerce
			.number()
			.int()
			.nonnegative()
			.multipleOf(5)
			.max(50)
			.default(5),
		id_role: z.coerce.number().int().min(1).optional(),
		id_insti: z.coerce.number().int().min(1).optional(),
		id_skill: z.coerce.number().int().min(1).optional(),
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

export type GetUsersType = z.infer<typeof GetUsersSchema>;
