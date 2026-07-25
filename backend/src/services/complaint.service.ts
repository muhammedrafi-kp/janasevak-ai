import Complaint from "../models/Complaint";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { IComplaint } from "../models/Complaint";
import { uploadFiles } from "../utils/upload";


export class ComplaintService {
    constructor() { };

    // async createComplaint(userId: Types.ObjectId, complaintData: IComplaint, files: Express.Multer.File[]) {
        async createComplaint(complaintData: IComplaint, files: Express.Multer.File[]) {

        const { title, description, location } = complaintData;

        // Upload files to Cloudinary
        const imageUrls: string[] = [];

        for (const file of files) {
            const uploaded = await uploadFiles([file]);
            if (uploaded.length > 0) {
                imageUrls.push(uploaded[0].url);
            }
        }

        // Create complaint
        const complaint = new Complaint({
            title,
            description,
            imageUrls,
            location,
            createdBy: userId,
        });

        await complaint.save();
        return complaint;
    }

    async getComplaints(userId: Types.ObjectId, queryParams: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) {

        const {
            page = 1,
            limit = 9,
            search = '',
            status = '',
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = queryParams;

        const filter: any = { userId, isDeleted: { $ne: true } };


        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (status && status !== 'all') {
            filter.status = status;
        }

        const sort: any = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const skip = (page - 1) * limit;

        const totalCount = await Complaint.countDocuments(filter);

        const complaints = await Complaint.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalCount / limit);

        return { complaints, totalPages };
    }

    async getComplaint(id: Types.ObjectId) {
        const complaint = await Complaint.findById(id);
        return complaint;
    }

    async updateComplaint(id: Types.ObjectId, complaintData: IComplaint) {
        const complaint = await Complaint.findByIdAndUpdate(id, complaintData, { new: true });
        return complaint;
    }

    async deleteComplaint(req: Request, res: Response) {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        return complaint;
    }

}