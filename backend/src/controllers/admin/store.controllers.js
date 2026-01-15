import Showroom from "../../models/common/store.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const addShowroom = async (req, res) => {
    try {

        const { name, address, city, state, pincode, country, phone, navigateURL } = req.body;



        if (!req.user.role) {
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        const image = req.files ? req.files.map(file => file.buffer.toString("base64")) : [];

        const showroom = Showroom(
            {
                name: name,
                address: address,
                city: city,
                state: state,
                pincode: pincode,
                country: country,
                timings: {
                    open: req.body["timings.open"],
                    close: req.body["timings.close"],
                },
                phone: phone,
                navigateURL: navigateURL,
                seeDesignsImages: image
            }
        );

        await showroom.save();

        return res.status(201).json(new ApiResponse(200, null, "Successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getShowrooms = async (req, res) => {
    try {
        if (!req.user.role) {
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        const store = await Showroom.find({});
        return res.status(200).json(new ApiResponse(200, store, "Successfull"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const softDeleteShowroom = async (req, res) => {
    try {
        const { id } = req.query;

        if (!req.user.role) {
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        await Showroom.findByIdAndUpdate(id, {
            isDeleted: true,
            deletedAt: new Date()
        });

        res.status(200).json({ success: true, message: "Soft deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

const hardDeleteShowroom = async (req, res) => {
    try {
        const { id } = req.query;

        if (!req.user.role) {
            return res.status(401).json(new ApiError(401, "Not Auth"));
        }

        await Showroom.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Hard deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export { addShowroom, getShowrooms, softDeleteShowroom, hardDeleteShowroom };

