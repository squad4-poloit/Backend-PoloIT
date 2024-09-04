import app from "./app";

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
	res.send("<h2>Api Sistema de Gestión de inscripciones PoloIT</h2>");
});

app.listen(PORT, () => {
	console.log(`
🚀 Server ready at: http://localhost:${PORT}`);
});
