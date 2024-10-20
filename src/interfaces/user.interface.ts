import type { User } from "@prisma/client";

export interface UserCustom
	extends Omit<User, "password" | "create_at" | "update_at"> {}

export interface UsersFilters {
	id_role?: number;
	id_insti?: number;
	id_skill?: number;
	role?: string;
	institution?: string;
	skill?: string;
}
