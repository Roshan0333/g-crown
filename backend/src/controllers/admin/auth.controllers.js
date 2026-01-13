import auth_Model from "../../models/admin/user.models.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import { encryptPasswordMethod, decryptPasswordMethod } from "../../utils/passwordEncrypt&passwordDecrypt.js";
import cookiesForUser from "../../utils/cookiesForUser.js";

let securitykey = process.env.securitykey || "welcome of admins"

const Signup = async (req, res) => {
    try {
        const { name, email, password, securityKey } = req.body;

        if (securityKey !== securitykey) {
            return res.status(401).json(new ApiError(401, "Incorrect Security Key."))
        }

        const splitName = name.split(" ");

        const adminDetail = auth_Model({
            email: email,
            password: await encryptPasswordMethod(password),
            firstName: splitName[0],
            lastName: splitName[1] || ""
        });

        await adminDetail.save();

        adminDetail.password = undefined;
        adminDetail.contact = undefined;
        adminDetail.profileImage = undefined

        const adminResponse = adminDetail.toObject();
        adminResponse.role = "admin";

        await cookiesForUser(res, adminResponse)

        return res.status(200).json(new ApiResponse(200, null, "Registration Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let adminDetail = await auth_Model.findOne({ email: email });

        const decryptPassword = await decryptPasswordMethod(password, adminDetail.password);

        if (!decryptPassword) {
            return res.status(401).json(new ApiError(401, "Incorrect Password"));
        }

        adminDetail.password = undefined;
        adminDetail.contact = undefined;
        adminDetail.profileImage = undefined;

        const adminResponse = adminDetail.toObject();
        adminResponse.role = "admin";


        await cookiesForUser(res, adminResponse)
        return res.status(200).json(new ApiResponse(200, null, "Access Granted"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const { email, password, securityKey } = req.body;

        if (securityKey !== securitykey) {
            return res.status(401).json(new ApiError(401, "Incorrect Security Key."))
        }

        let adminDetail = await auth_Model.findOneAndUpdate(
            { email: email },
            {
                password: await encryptPasswordMethod(password)
            }
        );

        adminDetail.password = undefined;
        adminDetail.contact = undefined;
        adminDetail.profileImage = undefined

        const adminResponse = adminDetail.toObject();
        adminResponse.role = "admin";

        await cookiesForUser(res, adminResponse)

        return res.status(200).json(new ApiResponse(200, null, "Password Change Successfully."));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const changePassword = async (req, res) => {
    try{

        const {oldPassword, newPassword} = req.body;

        const {_id, role} = req.user;

        if(!role){
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        const adminDetail = await auth_Model.findById(_id);

        const decryptPassword = await decryptPasswordMethod(oldPassword, adminDetail.password);

        if(!decryptPassword){
            return res.status(401).json(new ApiError(401, "Incorrect Old Password"));
        }

        await auth_Model.findByIdAndUpdate(
            {_id},
            {password: await encryptPasswordMethod(newPassword)}
        );

        return res.status(200).json(new ApiResponse(200, null, "Password Changes Successfully"));

    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const UpdateProfile = async (req, res) => {
    try {
        let {firstName, lastName, contact, gender } = req.body;
        const { _id, role } = req.user;

        if(!role){
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        const updateData = {};

        let image = req.file ? req.file.buffer.toString("base64") : null

        if (req.file) updateData.profileImage = image;
        if (contact) updateData.contact = contact;
        if (gender) updateData.gender = gender;
        if(firstName) updateData.firstName = firstName;
        if(lastName) updateData.lastName = lastName;
        if(!lastName) updateData.lastName = "";


        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update"
            });
        }

        await auth_Model.findByIdAndUpdate(
            _id,
            { $set: updateData },
            { new: true }
        );

        return res.status(200).json(new ApiResponse(200, null, "Profile updated successfully"));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.message }]));
    }
};

const myProfile = async (req, res) => {
    try{
        const {_id, role} = req.user;

        if(!role){
            return res.status(401).json(new ApiError("Not Auth"));
        }

        const adminDetail = await auth_Model.findById(_id);

        adminDetail.password = undefined;

        return res.status(200).json(new ApiResponse(200, adminDetail, "SuccessFul"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const Signout = async (req, res) => {
    try {
        res.clearCookie("AccessToken");
        res.clearCookie("RefreshToken");

        return res.status(200).json(new ApiResponse(200, null, "Signout Successfully"))
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]))
    }
}

export { Signup, Login, ForgotPassword, changePassword,  Signout, UpdateProfile, myProfile };