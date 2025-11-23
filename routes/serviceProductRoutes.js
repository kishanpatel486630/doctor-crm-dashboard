import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsByType,
} from "../controllers/serviceProductController.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllItems);
router.get("/type/:type", getItemsByType);
router.get("/:id", getItemById);
router.post("/", isAdmin, createItem);
router.put("/:id", isAdmin, updateItem);
router.delete("/:id", isAdmin, deleteItem);

export default router;
