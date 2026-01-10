import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import customerAuthRoutes from "./routers/customer/auth.route.js";
import customerProductRoutes from "./routers/customer/product.route.js";
import adminAuthRoutes from "./routers/admin/auth.route.js";
import adminProductRoutes from "./routers/admin/product.route.js";

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

app.use("/gcrown/api/v1/customer/auth", customerAuthRoutes);
app.use("/gcrown/api/v1/custmer/product", customerProductRoutes);
app.use("/gcrown/api/v1/admin/auth", adminAuthRoutes);
app.use("/gcrown/api/v1/admin/product", adminProductRoutes);

export default app;