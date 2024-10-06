import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "src/routes";
import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "@interfaces/error.interface";
import { errorHandler } from "./middlewares/errorHandler";
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
	(err: CustomError, _req: Request, res: Response, next: NextFunction) => {
		if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
			console.error(err);
			return res.status(400).send({ status: 400, message: err.message });
		}
		return next();
	},
);

app.use(morgan("dev"));

app.use("/api", router);

app.get("/api/error", (_req: Request, _res: Response, next: NextFunction) => {
	// Aquí generamos un error intencionalmente
	const error = new Error("This is an intentional error");
	next(error); // Pasamos el error al siguiente middleware (el manejador de errores)
});

app.get("/", (_req, res) => {
	res.send("<h2>Api Sistema de Gestión de inscripciones PoloIT</h2>");
});
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`
🚀 Server ${NODE_ENV} ready in at: http://localhost:${PORT}`);
});

export default app;
