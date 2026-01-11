import {Router} from "express";
import {getAllProducts, addReview} from "../../controllers/customer/product.controllers.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

const router = Router();

router.route("/review").post(isAuth, addReview);
router.route("/all").get( getAllProducts);


export default router