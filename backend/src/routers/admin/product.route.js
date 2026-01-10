import {Router} from "express";
import multer from "multer";
import isAuth from "../../middlewares/requiredLogin.middleware.js";
import {uploadNewProduct} from "../../controllers/admin/product.controllers.js";

const router = Router();

let storage = multer.memoryStorage();

let upload = multer({storage});

console.log("Enter")

router.route("/addProduct").post(isAuth, upload.array("productImage", 5) ,uploadNewProduct);

export default router;