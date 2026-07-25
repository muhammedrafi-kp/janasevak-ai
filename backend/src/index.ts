import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./configs/db";

const app = express();

configDotenv();
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const PORT = process.env.PORT || 3000;

app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "ok" });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});