import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import { GoogleGenAI } from "@google/genai";

configDotenv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is required");
export const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export const geminiAnalysisModel = process.env.GEMINI_ANALYSIS_MODEL || "gemini-2.5-flash";
