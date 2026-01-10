import DatabaseConnection from "./configs/db.config.js";
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config({
    path:"./.env"
});

DatabaseConnection();

const PORT = process.env.PORT||3000;

app.listen(PORT, () => console.log(`Server Run on PORT: ${PORT}`));