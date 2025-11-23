import express from "express";
import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getLeadsByStatus,
} from "../controllers/leadController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllLeads);
router.get("/status/:status", getLeadsByStatus);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", deleteLead);

export default router;
