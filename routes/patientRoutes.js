import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients,
} from "../controllers/patientController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllPatients);
router.get("/search", searchPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
