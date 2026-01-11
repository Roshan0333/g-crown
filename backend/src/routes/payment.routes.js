import express from "express";
import { createOrder  } from "../controllers/payment.controller.js";
import {verifyPayment} from "../controllers/payment.controller.js";
const router = express.Router();
router.post("/create", createOrder);
router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);



export default router;
