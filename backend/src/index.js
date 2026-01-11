import DatabaseConnection from "./configs/db.config.js";
import dotenv from "dotenv";
import app from "./app.js";
import orderRoutes from "./routes/order.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import addressRoutes from "./routes/address.routes.js";
import paymentRoutes from "./routes/payment.routes.js";


dotenv.config({
    path:"./.env"
});

app.use("/api/orders", orderRoutes);  // IMPORTANT
app.use("/api/reviews", reviewRoutes);
app.use("/api/addresses", addressRoutes);
 app.use("/api/payment", paymentRoutes);

DatabaseConnection();

const PORT = process.env.PORT||3000;

app.listen(PORT, () => console.log(`Server Run on PORT: ${PORT}`));