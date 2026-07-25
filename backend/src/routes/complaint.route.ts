import { Router } from "express";
import { ComplaintController } from "../controllers/complaint.controller";
import upload from "../middlewares/multer.middleware";

const router = Router();

const complaintController = new ComplaintController();

router.post("/analyse", upload.array("images", 4), complaintController.analyse);
router.post("/:id/answers", complaintController.answer);
router.post("/:id/submit", complaintController.submit);
router.get("/", complaintController.getComplaints);
router.get("/:id", complaintController.getComplaint);

export default router;
