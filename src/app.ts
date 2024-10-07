import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "src/routes";
import { errorHandler } from "./middlewares/errorHandler";
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

app.use("/api", router);

app.get("/", (_req, res) => {
	res.send("<h2>Api Sistema de Gestión de inscripciones PoloIT</h2>");
});
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`
🚀 Server ${NODE_ENV} ready in at: http://localhost:${PORT}`);
});

export default app;
