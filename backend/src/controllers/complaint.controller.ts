import { ComplaintService } from "../services/complaint.service";
import { Request, Response } from "express";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/http";
import { Types } from "mongoose";
import { IComplaint } from "../models/Complaint";

export class ComplaintController {
    constructor(private _complaintService: ComplaintService) { };

    async createComplaint(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.user?.userId);
            const complaint = await this._complaintService.createComplaint(userId, req.body as IComplaint, req.files as Express.Multer.File[]);
            res.status(HTTP_STATUS.CREATED).json(complaint);
        } catch (error) {
            console.error("Error creating complaint:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    async getComplaints(req: Request, res: Response): Promise<void> {
        try {
            const userId = new Types.ObjectId(req.user?.userId);

            const {
                page = 1,
                limit = 9,
                search = '',
                status = '',
                sortBy = 'createdAt',
                sortOrder = 'desc'
            } = req.query;

            const queryParams = {
                page: Number(page),
                limit: Number(limit),
                search: search as string,
                status: status as string,
                sortBy: sortBy as string,
                sortOrder: sortOrder as 'asc' | 'desc',
            };
            const complaints = await this._complaintService.getComplaints(userId, queryParams);
            res.status(HTTP_STATUS.OK).json(complaints);
        } catch (error) {
            console.error("Error getting complaints:", error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}