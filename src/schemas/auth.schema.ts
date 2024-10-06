import { z } from "zod";

export const PostRegisterSchema = z.object({
	body: z.object({
		dni: z.string().min(8, "El DNI debe tener exactamente 9 dígitos"), // Longitud exacta de 9 caracteres
		email: z.string().email("Formato de correo no válido"),
		password: z
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres"), // Mínimo de 8 caracteres
		first_name: z.string().min(1, "El nombre es obligatorio"), // Campo obligatorio
		last_name: z.string().min(1, "El apellido es obligatorio"), // Campo obligatorio
		birth_date: z
			.string()
			.date("Fecha no valida")
			.transform((date) => new Date(date)), // Verifica que la fecha sea válida
		roleId: z.number().int("El ID de rol debe ser un número entero"),
		institutionId: z
			.number()
			.int("El ID de la institución debe ser un número entero"),
	}),
});

export const PostLoginSchema = z.object({
	body: z.object({
		email: z.string().email("Formato de correo no válido"),
		password: z
			.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres"), // Mínimo de 8 caracteres
	}),
});

export type PostLoginType = z.infer<typeof PostLoginSchema>;

export type PostRegisterType = z.infer<typeof PostRegisterSchema>;
