import express from "express";
import {
  getAllPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
} from "../controllers/prescriptionController.js";
import { isAuthenticated, isDoctor } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllPrescriptions);
router.get("/patient/:patientId", getPrescriptionsByPatient);
router.get("/:id", getPrescriptionById);
router.post("/", isDoctor, createPrescription);
router.put("/:id", isDoctor, updatePrescription);
router.delete("/:id", isDoctor, deletePrescription);

export default router;
