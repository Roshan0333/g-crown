import productModel from "../../models/common/product.models.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const {_id} = req.user

        const {
            name,
            email,
            title,
            comment,
            rating,
        } = req.body;

        const product = await productModel.findById(productId);

        const mediaItem = req.file?req.file.buffer.toString("base64"):null;

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
            media:mediaItem,
            createdAt: new Date()
        });

        product.rating.totalReviews = product.reviews.length;
        product.rating.avg = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.rating.totalReviews;

        await product.save();

        return res.status(200).json(new ApiResponse(
            200,
            product,
            "Review added successfully"
        ));

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};

export { addReview };
