import auth_Model from "../../models/customer/user.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { encryptPasswordMethod, decryptPasswordMethod } from "../../utils/passwordEncrypt&passwordDecrypt.js";
import cookiesForUser from "../../utils/cookiesForUser.js";

const Signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const customerDetail = auth_Model({
            email: email,
            password: await encryptPasswordMethod(password),
            firstName: firstName,
            lastName: lastName
        });

        await customerDetail.save();

        customerDetail.password = undefined;
        customerDetail.contact = undefined;

        await cookiesForUser(res, customerDetail)

        return res.status(200).json(new ApiResponse(200, null, "Registration Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customerDetail = await auth_Model.findOne({ email: email });

        const decryptPassword = await decryptPasswordMethod(password, customerDetail.password);

        if (!decryptPassword) {
            return res.status(401).json(new ApiError(401, "Incorrect Password"));
        }

        customerDetail.password = undefined;
        customerDetail.contact = undefined;

        await cookiesForUser(res, customerDetail)
        
        return res.status(200).json(new ApiResponse(200, null, "Access Granted"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        let customerDetail = await auth_Model.findOneAndUpdate(
            { email: email },
            {
                password: await encryptPasswordMethod(password)
            }
        );

        customerDetail.password = undefined;
        customerDetail.contact = undefined;

        await cookiesForUser(res, customerDetail)
        return res.status(200).json(new ApiResponse(200, null, "Password Change Successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export { Signup, Login, ForgotPassword };