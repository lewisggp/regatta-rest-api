import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrderById,
  deleteOrderById,
  getOrderById,
} from "../controllers/orders.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getOrders);

router.get("/:orderId", getOrderById);

router.post("/", [verifyToken, isModerator], createOrder);

router.put("/:orderId", [verifyToken, isModerator], updateOrderById);

router.delete("/:orderId", [verifyToken, isAdmin], deleteOrderById);

export default router;
