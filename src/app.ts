import express from "express";
import cors from "cors";
import { router } from "src/routes";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.get("/", (_req, res) => {
	res.send("<h2>Api Sistema de Gestión de inscripciones PoloIT</h2>");
});

app.listen(PORT, () => {
	console.log(`
🚀 Server ready at: http://localhost:${PORT}`);
});
