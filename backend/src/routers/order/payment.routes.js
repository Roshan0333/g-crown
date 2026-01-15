import express from "express";
import { createOrder  } from "../../controllers/order/payment.controller.js";
import {verifyPayment} from "../../controllers/order/payment.controller.js";
const router = express.Router();
router.post("/create", createOrder);
router.post("/create-order", createOrder);
import isAuth from "../../middlewares/requiredLogin.middleware.js"

router.post("/verify",isAuth, verifyPayment);



export default router;
