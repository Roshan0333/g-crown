import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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

export default app;