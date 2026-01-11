import {Router} from "express";
import multer from "multer";
import isAuth from "../../middlewares/requiredLogin.middleware.js";
import {uploadNewProduct, updatePrice, updateQuantity, hardDeleteProduct, softDeleteProduct, restoreProduct} from "../../controllers/admin/product.controllers.js";

const router = Router();

let storage = multer.memoryStorage();

let upload = multer({storage});

console.log("Enter")

router.route("/addProduct").post(isAuth, upload.array("productImage", 5) ,uploadNewProduct);
router.route("/price").put(isAuth, updatePrice);
router.route("/quantity").put(isAuth,updateQuantity);
router.route("/harddelete").delete(isAuth, hardDeleteProduct);
router.route("/softdelete").delete(isAuth,softDeleteProduct);
router.route("/restore").put(isAuth, restoreProduct);

export default router;