import { PrismaClient } from "@prisma/client";

console.log("database url: ", process.env.DATABASE_URL);

const prisma = new PrismaClient();

console.log(
	"🚀 PrismaClient ha sido inicializado y está listo para interactuar con la base de datos.",
);

export default prisma;
