"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
console.log("🚀 PrismaClient ha sido inicializado y está listo para interactuar con la base de datos.");
exports.default = prisma;
//# sourceMappingURL=client.js.map