import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";
import { ComplaintService } from "../services/complaint.service";
import upload from "../middlewares/multer.middleware";

const router = Router();

const complaintService = new ComplaintService();
const complaintController = new ComplaintController(complaintService);

router.post("/", upload.array("images", 4), complaintController.createComplaint);
// router.get("/", complaintController.getComplaints);
// router.get("/:id", complaintController.getComplaint);
// router.put("/:id", complaintController.updateComplaint);
// router.delete("/:id", complaintController.deleteComplaint);

export default router;