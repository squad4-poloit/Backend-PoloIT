import { z } from "zod";

const EstadoMentoria = z.enum([
	"PENDIENTE",
	"ACEPTADA",
	"PROGRAMADA",
	"EN_PROGRESO",
	"COMPLETADA",
	"CANCELADA",
	"RECHAZADA",
	"REAGENDADA",
]);

// const tagSchema = z.object({
// 	nombre: z
// 		.string()
// 		.min(1, { message: "El nombre de la habilidad es requerido." })
// 		.max(50, {
// 			message: "El nombre de la habilidad no puede exceder los 50 caracteres.",
// 		}),
// });

export const GetMentorships = z.object({});

export const GetMentorship = z.object({});

export const PostMentorship = z.object({
	body: z
		.object({
			title: z
				.string({ message: "El titulo es obligatorio" })
				.max(100, "Puede tener hasta 100 caracteres o menos"),
			description: z
				.string({ message: "La descripcion es obligatorio" })
				.min(10, "Debe tener 10 caracteres o mas")
				.max(500, "Puede tener hasta 500 caracteres o menos"),
			status: EstadoMentoria.refine((val) => val !== undefined, {
				message:
					"Estado inválido: el estado debe ser uno de los valores permitidos.",
			}).optional(),
			student_spots: z
				.number({ message: "El cupo de alumnos debe ser un número" })
				.int({ message: "El cupo de alumnos debe ser un número entero." })
				.positive({
					message: "El cupo de alumnos debe ser un número positivo.",
				})
				.refine((student_spots) => student_spots <= 40, {
					message: "El cupo de alumnos no puede exceder los 40 cupos ",
				}),
			mentor_spots: z
				.number({ message: "El cupo de mentores debe ser un número" })
				.int({ message: "El cupo de mentores debe ser un número entero." })
				.positive({
					message: "El cupo de mentores debe ser un número positivo.",
				})
				.default(1),
			start_date: z
				.string()
				.date()
				.transform((date) => new Date(date)),
			end_date: z
				.string()
				.date()
				.transform((date) => new Date(date)),
		})
		.refine((data) => data.start_date <= data.end_date, {
			message:
				"La fecha de inicio no puede ser posterior a la fecha de finalización.",
			path: ["fechaInicio"],
		}),
});

export const PutMentorship = z.object({});

export const DeleteMentorship = z.object({});

export const PostUserToMentorshipSchema = z.object({
	body: z.object({
		user_id: z.string().uuid(),
	}),
	params: z.object({
		mentorship_id: z.coerce.number().int().min(0),
	}),
});

export type PostMentorshipType = z.infer<typeof PostMentorship>;
