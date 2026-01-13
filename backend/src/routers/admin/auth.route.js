import {Router} from "express";
import otp from "../../controllers/common/otp.controllers.js";
import {Signup, Login, ForgotPassword, changePassword, Signout, UpdateProfile} from "../../controllers/admin/auth.controllers.js";
import duplicateEmail from "../../middlewares/duplicationEmail.middlware.js";
import {adminEmail} from "../../middlewares/emailPresent.middlware.js";
import isAuth from "../../middlewares/requiredLogin.middleware.js";

let router = Router();

router.route("/signupOtp").post(duplicateEmail, otp);
router.route("/signup").post(Signup);
router.route("/login").post(adminEmail, Login);
router.route("/forgetPasswordOtp").post(adminEmail, otp);
router.route("/forgetPassword").put(ForgotPassword);
router.route("/changepassword").put(isAuth, changePassword)
router.route("/signout").post(Signout);
router.route("/profile").put(isAuth, UpdateProfile)

export default router;
