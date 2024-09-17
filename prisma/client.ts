import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log("🚀 PrismaClient ha sido inicializado y está listo para interactuar con la base de datos.");

export default prisma;
