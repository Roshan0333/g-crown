import {Router} from "express";
import otp from "../../controllers/common/otp.controllers.js";
import {Signup, Login, ForgotPassword} from "../../controllers/customer/auth.controllers.js";
import duplicateEmail from "../../middlewares/duplicationEmail.middlware.js";
import {customerEmail} from "../../middlewares/emailPresent.middlware.js";

let router = Router();

router.route("/signupOtp").post(duplicateEmail, otp);
router.route("/signup").post(Signup);
router.route("/login").post(customerEmail, Login);
router.route("/forgetPasswordOtp").post(customerEmail, otp);
router.route("/forgetPassword").put(ForgotPassword);

export default router;
