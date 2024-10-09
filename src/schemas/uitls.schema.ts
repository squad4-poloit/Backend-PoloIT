import { z } from "zod";

export const idSchema = z.coerce.number().int().min(1);
export const uuidSchema = z.string().uuid("El id uudi no es valido");
