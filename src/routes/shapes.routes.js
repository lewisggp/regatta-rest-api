import { Router } from "express";
import {
  getShapes,
  createShape,
  updateShapeById,
  deleteShapeById,
  getShapeById,
} from "../controllers/shapes.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getShapes);

router.get("/:shapeId", getShapeById);

router.post("/", [verifyToken, isModerator], createShape);

router.put("/:shapeId", [verifyToken, isModerator], updateShapeById);

router.delete("/:shapeId", [verifyToken, isAdmin], deleteShapeById);

export default router;
