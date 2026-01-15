import express from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  generateInvoice,
  saveOrder,
  cancelOrder,
  
} from "../../controllers/order/order.controller.js";
import { trackOrder } from "../../controllers/order/trackOrderController.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrder);
router.put("/:id/status", updateOrderStatus);
router.get("/:id/invoice", generateInvoice);
router.post("/save", saveOrder);
router.put("/cancel/:id", cancelOrder);
router.get("/track/:displayOrderId", trackOrder);

export default router;
