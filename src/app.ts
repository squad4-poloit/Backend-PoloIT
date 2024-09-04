import express from "express";
import mentorshipRoutes from "./routes/mentorshipRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", mentorshipRoutes);

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

export default app;
