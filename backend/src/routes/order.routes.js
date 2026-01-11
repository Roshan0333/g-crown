import express from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  generateInvoice,
  saveOrder
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrder);
router.put("/:id/status", updateOrderStatus);
router.get("/:id/invoice", generateInvoice);
router.post("/save", saveOrder);

export default router;
