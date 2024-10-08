import type { User } from "@prisma/client";

export interface UserCustom
	extends Omit<User, "password" | "create_at" | "update_at"> {}

export interface UsersFilters {
	role?: string;
	institution?: string;
	skill?: string;
}
