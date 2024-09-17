"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const alice = yield prisma.user.upsert({
            where: { email: 'alice@prisma.io' },
            update: {},
            create: {
                first_name: "alice",
                last_name: "Messi",
                email: "alice@gmail.test",
                dni: "42236541",
                phone: "1241523663",
                role: {
                    create: {
                        name: "admin"
                    }
                }
            },
        });
        const bob = yield prisma.user.upsert({
            where: { email: 'bob@prisma.io' },
            update: {},
            create: {
                first_name: "bob",
                last_name: "Messi",
                email: "bob@gmail.test",
                dni: "4712352152",
                phone: "236214",
                role: {
                    create: {
                        name: "manager"
                    }
                }
            },
        });
        const pepe = yield prisma.user.upsert({
            where: { email: 'pepe@prisma.io' },
            update: {},
            create: {
                first_name: "pepe",
                last_name: "Messi",
                email: "pepe@gmail.test",
                dni: "63254712",
                phone: "25463321",
                role: {
                    create: {
                        name: "student"
                    }
                }
            },
        });
        console.log({ alice, bob, pepe });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map