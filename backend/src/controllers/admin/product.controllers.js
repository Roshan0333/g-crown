import productModel from "../../models/common/product.models.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const uploadNewProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            sku,
            category,
            collection,
            tags,
            attributes,
            price,
            stockStatus,
            variants,
            description,
            additionalInfo,
        } = req.body;

        const images = req.files ? req.files.map(file => file.buffer.toString("base64")) : null;

        const newProduct = productModel({
            name:name,
            slug:slug,
            sku:sku,
            category:category,
            collection:collection,
            tags:tags,
            attributes:attributes,
            price:price,
            stockStatus:stockStatus,
            variants:variants,
            description:description,
            additionalInfo:additionalInfo,
            productImage:images
        });

        await newProduct.save();

        return res.status(200).json(new ApiResponse(200, null, "Product Upload Successfully."));  
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.message }]));
    }
}

export {uploadNewProduct};