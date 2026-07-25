import cloudinary from "../configs/cloudinary";
import streamifier from "streamifier";
import crypto from "node:crypto";
import sharp from "sharp";

export interface UploadedFile {
    filename: string;
    url: string;
}

const getResourceType = (mimetype: string): "image" | "raw" => {
    if (mimetype.startsWith("image/")) return "image";
    return "raw";
};

export const uploadFiles = async (attachments: Express.Multer.File[]): Promise<UploadedFile[]> => {
    const uploadPromises: Promise<UploadedFile>[] = attachments.map(file => {
        return new Promise<UploadedFile>((resolve, reject) => {
            const resourceType = getResourceType(file.mimetype);
            const stream = cloudinary.uploader.upload_stream(
                { folder: "tasq/task/attachments", resource_type: resourceType },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result || !result.secure_url) return reject(new Error("Upload failed"));
                    resolve({ filename: file.originalname, url: result.secure_url });
                }
            );
            streamifier.createReadStream(file.buffer).pipe(stream);
        });
    });
    return await Promise.all(uploadPromises);
}

export async function prepareImages(files: Express.Multer.File[]) {
    if (!files.length) throw new Error("At least one image is required");
    if (files.length > 4) throw new Error("A maximum of 4 images is allowed");
    return Promise.all(files.map(async (file) => {
        if (!["image/jpeg", "image/png"].includes(file.mimetype)) throw new Error("Only JPG and PNG images are allowed");
        const buffer = await sharp(file.buffer, { failOn: "error" }).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
        return { mimeType: "image/jpeg", base64: buffer.toString("base64"), hash: crypto.createHash("sha256").update(buffer).digest("hex") };
    }));
}

export async function uploadPreparedImages(images: Array<{ mimeType: string; base64: string }>): Promise<string[]> {
    return Promise.all(images.map((image) => new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload(`data:${image.mimeType};base64,${image.base64}`, { folder: "janasevak-ai/complaints", resource_type: "image" }, (error, result) => {
            if (error || !result?.secure_url) return reject(error || new Error("Cloudinary upload failed"));
            resolve(result.secure_url);
        });
    })));
}
