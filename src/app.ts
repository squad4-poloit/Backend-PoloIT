import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { router } from "src/routes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./swagger";
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(errorHandler);

app.get("/", (_req, res) => {
	res.send("<h2>Api Sistema de Gestión de inscripciones PoloIT</h2>");
});
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.listen(PORT, () => {
	console.log(`🚀 Server ${NODE_ENV} ready in at: http://localhost:${PORT}/`);
	console.log(
		`🚀 Server Documentation ${NODE_ENV} ready in at: http://localhost:${PORT}/api/documentation`,
	);
});

export default app;
