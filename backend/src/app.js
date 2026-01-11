import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/order.routes.js";  // 👈 हा import add कर

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],  
}))

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use("/api/orders", orderRoutes);

export default app;