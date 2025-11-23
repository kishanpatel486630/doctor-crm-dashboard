import express from "express";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDate,
} from "../controllers/appointmentController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllAppointments);
router.get("/date", getAppointmentsByDate);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
