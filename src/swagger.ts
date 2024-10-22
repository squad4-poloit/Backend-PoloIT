import swaggerJSDoc, {
	type OAS3Definition,
	type OAS3Options,
} from "swagger-jsdoc";
const PORT = process.env.PORT || 3000;

const swaggerDefinition: OAS3Definition = {
	openapi: "3.0.0",
	info: {
		title: "Api Documentación",
		version: "1.0.0",
	},
	servers: [
		{
			url: "https://backend.squad4-poloit.xyz/api",
		},
		{
			url: `http://localhost:${PORT}/api`,
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
			},
		},
		schemas: {
			User: {
				type: "object",
				properties: {
					id: {
						type: "string",
						description: "ID único del usuario (UUID).",
						example: "104d24f6-ed9f-44b6-a147-fe002d5f3e73",
					},
					dni: {
						type: "string",
						description: "DNI único del usuario.",
						example: "12345678X",
					},
					email: {
						type: "string",
						description: "Correo electrónico del usuario.",
						example: "user@example.com",
					},
					first_name: {
						type: "string",
						description: "Nombre del usuario.",
						example: "John",
					},
					last_name: {
						type: "string",
						description: "Apellido del usuario.",
						example: "Doe",
					},
					password: {
						type: "string",
						description: "Contraseña del usuario.",
						example: "password123",
					},
					birth_date: {
						type: "string",
						format: "date",
						description: "Fecha de nacimiento del usuario.",
						example: "1990-01-01",
					},
					phone: {
						type: "string",
						description: "Número de teléfono del usuario.",
						example: "+123456789",
					},
					linkedIn: {
						type: "string",
						description: "Perfil de LinkedIn del usuario.",
						example: "https://www.linkedin.com/in/user/",
					},
					roleId: {
						type: "integer",
						description: "ID del rol asociado.",
						example: 1,
					},
					institutionId: {
						type: "integer",
						description: "ID de la institución asociada.",
						example: 1,
					},
					role: {
						$ref: "#/components/schemas/Role",
					},
					institution: {
						$ref: "#/components/schemas/Institution",
					},
					skills: {
						type: "array",
						items: {
							$ref: "#/components/schemas/Skill",
						},
					},
				},
			},
			Role: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID único del rol.",
						example: 1,
					},
					name: {
						type: "string",
						description:
							"Nombre del rol (e.g., ADMIN, GESTOR, MENTOR, EGRESADO).",
						example: "GESTOR",
					},
				},
			},
			Mentorship: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID único de la mentoría.",
						example: 1,
					},
					title: {
						type: "string",
						description: "Título de la mentoría.",
						example: "Mentoría en Desarrollo Web",
					},
					description: {
						type: "string",
						description: "Descripción de la mentoría.",
						example:
							"Una mentoría enfocada en el desarrollo de aplicaciones web con JavaScript.",
					},
					student_spots: {
						type: "integer",
						description: "Número de cupos disponibles para estudiantes.",
						example: 5,
					},
					mentor_spots: {
						type: "integer",
						description: "Número de cupos disponibles para mentor.",
						example: 1,
					},
					status: {
						type: "string",
						description: "Estado de la mentoría.",
						example: "PENDIENTE",
					},
					start_date: {
						type: "string",
						format: "date",
						description: "Fecha de inicio de la mentoría.",
						example: "2024-01-01",
					},
					end_date: {
						type: "string",
						format: "date",
						description: "Fecha de finalización de la mentoría.",
						example: "2024-03-01",
					},
				},
			},
			UserOnMentorship: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID único de la relación usuario-mentoría.",
						example: 1,
					},
					userId: {
						type: "string",
						description: "ID del usuario.",
						example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
					},
					mentorshipId: {
						type: "integer",
						description: "ID de la mentoría.",
						example: 1,
					},
					grade: {
						type: "integer",
						description: "Calificación del usuario en la mentoría.",
						example: 90,
					},
				},
			},
			Institution: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID único de la institución.",
						example: 1,
					},
					name: {
						type: "string",
						description: "Nombre de la institución.",
						example: "Universidad XYZ",
					},
					type: {
						type: "string",
						enum: ["POLO_IT", "ONG", "EMPRESA"],
						description: "Tipo de institución.",
						example: "ONG",
					},
				},
			},
			Skill: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID único de la habilidad.",
						example: 1,
					},
					name: {
						type: "string",
						description: "Nombre de la habilidad.",
						example: "JavaScript",
					},
				},
			},
			Notification: {
				type: "object",
				properties: {
					id: {
						type: "integer",
						description: "ID de la notificación",
						example: 1,
					},
					message: {
						type: "string",
						description: "El mensaje de la notificación",
						example: "Has sido invitado a una mentoría",
					},
					userId: {
						type: "string",
						description: "ID del usuario al que va dirigida la notificación",
						example: "c56a4180-65aa-42ec-a945-5fd21dec0538",
					},
					read: {
						type: "boolean",
						description: "Indica si la notificación ha sido leída",
						example: false,
					},
					createdAt: {
						type: "string",
						format: "date",
						description: "Fecha de creación de la notificación",
						example: "2024-10-10",
					},
				},
			},
		},
	},
};

const swaggerOptions: OAS3Options = {
	swaggerDefinition,
	apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);
