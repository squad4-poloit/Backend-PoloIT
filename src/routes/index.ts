import { Router } from "express";
import { readdirSync } from "node:fs";
const router = Router();
const PATH_ROUTER = `${__dirname}`;

const cleanFileName = (fileName: string) => {
	const file = fileName.split("R").shift();
	console.log(file);
	return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
	const cleanName = cleanFileName(fileName);

	if (cleanName !== "index.ts") {
		import(`./${cleanName}Router`).then((moduleRouter) => {
			console.log(`Cargando la ruta.... /${cleanName}`);
			router.use(`/${cleanName}`, moduleRouter.router);
		});
	}
});

export { router };
