import { Router } from "express";
import { upload } from "../config/cloudinary.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/image", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  return res.status(201).json({ url: req.file.path });
});

export default router;
