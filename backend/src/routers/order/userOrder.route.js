import {Router} from "express";
import mongoose from "mongoose";
import userOrderModel from "../../models/order/userOrder.model.js";
import { getOrderById } from "../../controllers/order/userOrder.controller.js";

const router = Router();

router.post("/create-dummy2", async (req, res) => {
  try {
    const dummyOrder = await userOrderModel.create({
      orderId: "NEWORDER123",
      userId: new mongoose.Types.ObjectId(), // fake user for now
      items: [
        { name: "jewellery", quantity: 1 },
        { name: "earrings", quantity: 2 }
      ],
      status: "In Progress"
    });

    res.status(201).json({
      message: "Dummy order created",
      orderId: dummyOrder.orderId
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:orderId", getOrderById);



export default router;
