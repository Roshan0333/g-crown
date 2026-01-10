import {Router} from "express";
import otp from "../../controllers/common/otp.controllers.js";
import {Signup, Login, ForgotPassword} from "../../controllers/admin/auth.controllers.js";
import duplicateEmail from "../../middlewares/duplicationEmail.middlware.js";
import {adminEmail} from "../../middlewares/emailPresent.middlware.js";

let router = Router();

router.route("/signupOtp").post(duplicateEmail, otp);
router.route("/signup").post(Signup);
router.route("/login").post(adminEmail, Login);
router.route("/forgetPasswordOtp").post(adminEmail, otp);
router.route("/forgetPassword").put(ForgotPassword);

export default router;
