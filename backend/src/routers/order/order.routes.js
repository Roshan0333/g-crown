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
import isAuth from "../../middlewares/requiredLogin.middleware.js"

const router = express.Router();

router.get("/", isAuth, getOrders);
router.post("/create",isAuth, createOrder);
router.put("/:id/status", updateOrderStatus);
router.get("/:id/invoice", generateInvoice);
router.post("/save", isAuth, saveOrder);
router.put("/cancel/:id", cancelOrder);
router.get("/track/:displayOrderId", trackOrder);

export default router;
