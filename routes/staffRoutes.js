import express from "express";
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllStaff);
router.get("/:id", getStaffById);
router.post("/", isAdmin, createStaff);
router.put("/:id", isAdmin, updateStaff);
router.delete("/:id", isAdmin, deleteStaff);

export default router;
