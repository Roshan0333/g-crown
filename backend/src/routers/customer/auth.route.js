import {Router} from "express";
import otp from "../../controllers/common/otp.controllers.js";
import {Signup, Login, ForgotPassword, Signout, UpdateProfile} from "../../controllers/customer/auth.controllers.js";
import duplicateEmail from "../../middlewares/duplicationEmail.middlware.js";
import {customerEmail} from "../../middlewares/emailPresent.middlware.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

let router = Router();


router.route("/signupOtp").post(duplicateEmail, otp);
router.route("/signup").post(Signup);
router.route("/login").post(customerEmail, Login);
router.route("/forgetPasswordOtp").post(customerEmail, otp);
router.route("/forgetPassword").put(ForgotPassword);
router.route("/signout").post(Signout);
router.route("/profile").put(isAuth, UpdateProfile)

export default router;
