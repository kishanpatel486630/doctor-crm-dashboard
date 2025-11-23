import express from "express";
import { upload } from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

// Single file upload
router.post("/single", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Multiple files upload
router.post("/multiple", upload.array("files", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const files = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size,
      mimetype: file.mimetype,
    }));

    res.json({
      message: "Files uploaded successfully",
      files,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
