import {Router} from "express";
import {addReview} from "../../controllers/customer/product.controllers.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

const router = Router();

router.route("/review").post(isAuth, addReview);

export default router