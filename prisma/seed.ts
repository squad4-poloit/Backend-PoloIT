import { PrismaClient, type Skill } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
	console.log("🚀 Creando Permisos....\n");

	const permissions = await prisma.permission.createManyAndReturn({
		data: [
			{ name: "CREATE_USER" },
			{ name: "READ_USER" },
			{ name: "UPDATE_USER" },
			{ name: "DELETE_USER" },
			{ name: "CREATE_MENTORSHIP" },
			{ name: "READ_MENTORSHIP" },
			{ name: "UPDATE_MENTORSHIP" },
			{ name: "DELETE_MENTORSHIP" },
		],
		skipDuplicates: true,
	});

	console.log({ permissions });

	console.log("🚀 Creando roles....\n");

	const role_admin = await prisma.role.create({
		data: { name: "ADMIN" },
	});
	const role_gestor = await prisma.role.create({
		data: { name: "GESTOR" },
	});
	const role_mentor = await prisma.role.create({
		data: { name: "MENTOR" },
	});
	const role_egresado = await prisma.role.create({
		data: { name: "EGRESADO" },
	});

	console.log({ role_admin, role_gestor, role_mentor, role_egresado });

	const adminPermission = [
		{ id: permissions[0].id },
		{ id: permissions[1].id },
		{ id: permissions[2].id },
		{ id: permissions[3].id },
		{ id: permissions[4].id },
		{ id: permissions[5].id },
		{ id: permissions[6].id },
		{ id: permissions[7].id },
	];
	const gestorPermission = [
		{ id: permissions[0].id },
		{ id: permissions[1].id },
		{ id: permissions[2].id },
		{ id: permissions[3].id },
	];
	const egresadoPermission = [
		{ id: permissions[0].id },
		{ id: permissions[1].id },
		{ id: permissions[2].id },
		{ id: permissions[3].id },
	];
	const mentorPermission = [
		{ id: permissions[0].id },
		{ id: permissions[1].id },
		{ id: permissions[2].id },
		{ id: permissions[3].id },
	];

	// Asignar permisos a los roles
	await prisma.role.update({
		where: { id: role_admin.id },
		data: {
			permissions: {
				connect: adminPermission,
			},
		},
	});

	await prisma.role.update({
		where: { id: role_gestor.id },
		data: {
			permissions: {
				connect: gestorPermission,
			},
		},
	});
	await prisma.role.update({
		where: { id: role_mentor.id },
		data: {
			permissions: {
				connect: egresadoPermission,
			},
		},
	});
	await prisma.role.update({
		where: { id: role_egresado.id },
		data: {
			permissions: {
				connect: mentorPermission,
			},
		},
	});

	console.log("🚀 Creando Instituciones....\n");

	const inst_poloit = await prisma.institution.create({
		data: { name: "Instituto Tecnológico", type: "POLO_IT" },
	});
	const inst_ong = await prisma.institution.create({
		data: { name: "Fundación ONG", type: "ONG" },
	});
	const inst_xyz = await prisma.institution.create({
		data: { name: "Empresa XYZ", type: "EMPRESA" },
	});

	console.log({ inst_ong, inst_poloit, inst_xyz });

	console.log("🚀 Creando Skills....\n");

	const skills = await prisma.skill.createManyAndReturn({
		data: [
			// Lenguajes de Programación
			{ name: "JavaScript" },
			{ name: "Python" },
			{ name: "Java" },
			{ name: "C++" },
			{ name: "C#" },
			{ name: "SQL" },
			{ name: "HTML/CSS" },
			{ name: "Ruby" },
			{ name: "Swift" },
			{ name: "Kotlin" },
			{ name: "Go" },
			{ name: "Rust" },
			{ name: "PHP" },
			{ name: "Perl" },
			{ name: "TypeScript" },
			{ name: "R" },
			{ name: "Scala" },

			// Frameworks y Librerías
			{ name: "React.js" },
			{ name: "Angular" },
			{ name: "Vue.js" },
			{ name: "Node.js" },
			{ name: "Express.js" },
			{ name: "Spring Boot" },
			{ name: "ASP.NET" },
			{ name: "Ruby on Rails" },
			{ name: "Django" },
			{ name: "Flask" },
			{ name: "Laravel" },
			{ name: "Symfony" },
			{ name: "Next.js" },
			{ name: "Gatsby.js" },
			{ name: "Svelte" },
			{ name: "Meteor.js" },
			{ name: "Electron" },
			{ name: "TensorFlow" },
			{ name: "PyTorch" },
			{ name: "FastAPI" },
			{ name: "NestJS" },
			{ name: "Nuxt.js" },
			{ name: "Flutter" },
			{ name: "Ionic" },
			{ name: "Qt" },

			{ name: "AWS (Amazon Web Services)" },
			{ name: "Docker" },
			{ name: "Kubernetes" },
			{ name: "DevOps" },
			{ name: "Machine Learning" },
			{ name: "Data Analysis" },
			{ name: "Cybersecurity" },
			{ name: "Blockchain" },
			{ name: "Agile Methodologies" },
		],
		skipDuplicates: true, // Evita duplicados si ya se ejecutó previamente
	});

	console.log({ skills });

	console.log("🚀 Creando Usuarios....\n");

	const users = await prisma.user.createManyAndReturn({
		data: [
			// Admin
			{
				dni: "12345678A",
				email: "admin@company.com",
				first_name: "Carlos",
				last_name: "Fernandez",
				password: "hashedAdminPassword123",
				phone: "+34123456789",
				birth_date: new Date("1985-04-22"),
				linkedIn: "https://www.linkedin.com/in/carlosfernandez",
				roleId: role_admin.id,
				institutionId: inst_poloit.id,
			},

			// Gestores
			{
				dni: "23456789B",
				email: "gestor1@company.com",
				first_name: "Lucia",
				last_name: "Martinez",
				password: "hashedGestorPassword123",
				phone: "+34987654321",
				birth_date: new Date("1990-05-10"),
				linkedIn: "https://www.linkedin.com/in/luciamartinez",
				roleId: role_gestor.id,
				institutionId: inst_ong.id,
			},
			{
				dni: "34567890C",
				email: "gestor2@company.com",
				first_name: "Javier",
				last_name: "Lopez",
				password: "hashedGestorPassword123",
				phone: "+34123456789",
				birth_date: new Date("1988-09-14"),
				linkedIn: "https://www.linkedin.com/in/javierlopez",
				roleId: role_gestor.id,
				institutionId: inst_xyz.id,
			},

			// Mentores
			{
				dni: "45678901D",
				email: "mentor1@company.com",
				first_name: "Elena",
				last_name: "Sanchez",
				password: "hashedMentorPassword123",
				phone: "+34987651234",
				birth_date: new Date("1992-12-20"),
				linkedIn: "https://www.linkedin.com/in/elenasanchez",
				roleId: role_mentor.id,
				institutionId: inst_poloit.id,
			},
			{
				dni: "56789012E",
				email: "mentor2@company.com",
				first_name: "Mario",
				last_name: "Ramirez",
				password: "hashedMentorPassword123",
				phone: "+34986543210",
				birth_date: new Date("1991-08-07"),
				linkedIn: "https://www.linkedin.com/in/marioramirez",
				roleId: role_mentor.id,
				institutionId: inst_ong.id,
			},
			{
				dni: "67890123F",
				email: "mentor3@company.com",
				first_name: "Ana",
				last_name: "Gomez",
				password: "hashedMentorPassword123",
				phone: "+34912345678",
				birth_date: new Date("1989-03-15"),
				linkedIn: "https://www.linkedin.com/in/anagomez",
				roleId: role_mentor.id,
				institutionId: inst_xyz.id,
			},

			// Egresados
			{
				dni: "78901234G",
				email: "egresado1@company.com",
				first_name: "Sofia",
				last_name: "Torres",
				password: "password123",
				phone: "+34901234567",
				birth_date: new Date("1997-01-23"),
				linkedIn: "https://www.linkedin.com/in/sofiatorres",
				roleId: role_egresado.id,
				institutionId: inst_poloit.id,
			},
			{
				dni: "89012345H",
				email: "egresado2@company.com",
				first_name: "Manuel",
				last_name: "Perez",
				password: "password123",
				phone: "+34965432109",
				birth_date: new Date("1995-04-12"),
				linkedIn: "https://www.linkedin.com/in/manuelperez",
				roleId: role_egresado.id,
				institutionId: inst_xyz.id,
			},
			{
				dni: "90123456I",
				email: "egresado3@company.com",
				first_name: "Carmen",
				last_name: "Herrera",
				password: "password123",
				phone: "+34983456789",
				birth_date: new Date("1996-02-19"),
				linkedIn: "https://www.linkedin.com/in/carmenherrera",
				roleId: role_egresado.id,
				institutionId: inst_ong.id,
			},
			{
				dni: "01234567J",
				email: "egresado4@company.com",
				first_name: "Daniel",
				last_name: "Navarro",
				password: "password123",
				phone: "+34987654321",
				birth_date: new Date("1998-07-03"),
				linkedIn: "https://www.linkedin.com/in/danielnavarro",
				roleId: role_egresado.id,
				institutionId: inst_ong.id,
			},
			{
				dni: "12345678K",
				email: "egresado5@company.com",
				first_name: "Laura",
				last_name: "Mendez",
				password: "password123",
				phone: "+34912345678",
				birth_date: new Date("1996-11-09"),
				linkedIn: "https://www.linkedin.com/in/lauramendez",
				roleId: role_egresado.id,
				institutionId: inst_xyz.id,
			},
			{
				dni: "23456789L",
				email: "egresado6@company.com",
				first_name: "Pablo",
				last_name: "Gil",
				password: "password123",
				phone: "+34981234567",
				birth_date: new Date("1994-09-01"),
				linkedIn: "https://www.linkedin.com/in/pablogil",
				roleId: role_egresado.id,
				institutionId: inst_poloit.id,
			},
			{
				dni: "34567890M",
				email: "egresado7@company.com",
				first_name: "Cristina",
				last_name: "Ruiz",
				password: "password123",
				phone: "+34976543210",
				birth_date: new Date("1997-06-29"),
				linkedIn: "https://www.linkedin.com/in/cristinarruiz",
				roleId: role_egresado.id,
				institutionId: inst_poloit.id,
			},
			{
				dni: "45678901N",
				email: "egresado8@company.com",
				first_name: "Jorge",
				last_name: "Serrano",
				password: "password123",
				phone: "+34912345678",
				birth_date: new Date("1996-12-10"),
				linkedIn: "https://www.linkedin.com/in/jorgeserrano",
				roleId: role_egresado.id,
				institutionId: inst_xyz.id,
			},
		],
		skipDuplicates: true,
	});

	console.log({ users });

	console.log("🚀 Creando Mentorias....\n");

	const mentorship_1 = await prisma.mentorship.create({
		data: {
			title: "Desarrollo Fullstack",
			description: "Una mentoría para aprender desarrollo web fullstack.",
			student_spots: 5,
			status: "Disponible",
			tags: "JavaScript, Node.js, React",
			start_date: new Date("2023-10-01"),
		},
	});

	const mentorship_2 = await prisma.mentorship.create({
		data: {
			title: "Análisis de Datos",
			description: "Una mentoría sobre análisis de datos y visualización.",
			student_spots: 3,
			status: "Disponible",
			tags: "Python, SQL, Tableau",
			start_date: new Date("2023-11-01"),
		},
	});

	console.log({ mentorship_1, mentorship_2 });

	const users_connect_mentorship = await prisma.userOnMentorship.create({
		data: {
			user: {
				connect: { id: users[1].id },
			},
			mentorship: {
				connect: { id: mentorship_1.id },
			},
		},
	});

	console.log({ users_connect_mentorship });

	const randomListSkills = (skills: Skill[]) => {
		const shuffledSkills = skills.sort(() => Math.random() - 0.5);

		const randomCount = Math.min(
			Math.floor(Math.random() * 5) + 1,
			skills.length,
		);

		return shuffledSkills
			.slice(0, randomCount)
			.map((skill) => ({ id: skill.id }));
	};

	const userAssignSkills = (id: string) => {
		const request = {
			where: { id },
			data: {
				skills: {
					connect: randomListSkills(skills),
				},
			},
			include: {
				skills: true,
			},
		};

		return request;
	};
	console.log("🚀 Asignando Skills a los usuarios");

	for (const user of users) {
		const updatedUser = await prisma.user.update(userAssignSkills(user.id));
		console.log({ updatedUser });
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
