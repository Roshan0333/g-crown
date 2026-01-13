import productModel from "../../models/common/product.models.js";
import authModel from "../../models/customer/user.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({
            deleted: { $ne: true },
            status: true
        });

        return res.status(200).json(
            new ApiResponse(200, products, "Products fetched successfully")
        );

    } catch (err) {
        return res.status(500).json(
            new ApiError(500, err.message, [{ message: err.message }])
        );
    }
};

const addReview = async (req, res) => {
    try {
        const { productId } = req.query;
        const {_id} = req.user

        const {
            name,
            email,
            title,
            comment,
            rating,
        } = req.body;

        const product = await productModel.findById(productId);
        const userDetail = await authModel.findById(_id)

        let fullName = userDetail.firstName+" "+ userDetail.lastName;

        if(fullName !== name){
            return res.status(401).json(new ApiError(401, "User Name not Match."));
        }

        if(email !== userDetail.email){
            return res.status(401).json(new ApiError(401, "Email not Match."));
        }

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        product.reviews.push({
            customerId: _id,
            name: name,
            email:email,
            title:title,
            comment:comment,
            rating:rating,
            media:userDetail.profileImage,
            createdAt: new Date()
        });

        product.rating.totalReviews = product.reviews.length;
        product.rating.avg = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.rating.totalReviews;

        await product.save();

        return res.status(200).json(new ApiResponse(
            200,
            null,
            "Review added successfully"
        ));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};


export {getAllProducts, addReview };
