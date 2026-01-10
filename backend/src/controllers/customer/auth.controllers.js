import auth_Model from "../../models/customer/user.model.js";
import {ApiError} from "../../utils/api-error.js";
import {ApiResponse} from "../../utils/api-response.js";
import { encryptPasswordMethod } from "../../utils/passwordEncrypt&passwordDecrypt.js";

const Signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;

        const customerDetail = auth_Model({
            email: email,
            password: await encryptPasswordMethod(password),
            firstName: firstName,
            lastName: lastName
        });

        await customerDetail.save();

        return res.status(200).json(new ApiResponse(200, null, "Registration Successful"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}