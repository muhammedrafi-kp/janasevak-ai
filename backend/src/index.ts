import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./configs/db";
import complaintRoutes from "./routes/complaint.route";
import { complaintErrorHandler } from "./controllers/complaint.controller";

const app = express();

configDotenv();
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "https://janasevak-ai.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

import authRoute from "./routes/auth.route";
import complaintRoute from "./routes/complaint.route";
import userRoute from "./routes/user.routes";

app.use("/auth", authRoute);
app.use("/complaints", complaintRoute);
app.use("/users", userRoute);


const PORT = process.env.PORT || 3000;

app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "ok" });
})
app.use("/api/complaints", complaintRoutes);
app.use(complaintErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
