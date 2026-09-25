import { json, Router } from "express";
import { authanticate } from "../middlewares/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB
  },
});

const router = Router();

router.post(
  "/",
  authanticate,
  (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Unauthorized or forbidden",
      });
    }

    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);

    next();
  },
  createProductController,
);

export default router;
