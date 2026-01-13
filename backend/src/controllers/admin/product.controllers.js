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
            status
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
            status: status,
            productImage:images
        });

        await newProduct.save();

        return res.status(200).json(new ApiResponse(200, null, "Product Upload Successfully."));  
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.message }]));
    }
}

const getAllItem = async (req, res) => {
    try{
        const itemsList = await productModel.find({});
        return res.status(200).json(new ApiResponse(200, itemsList, "Successfully"));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const updateQuantity = async (req, res) => {
    try {
        const { productId, variants } = req.body;

        if (!Array.isArray(variants)) {
            return res.status(400).json(new ApiError(400, "variants must be an array"));
        }

        if (variants.some(v => v.quantity < 0)) {
            return res.status(400).json(new ApiError(400, "Variant quantity cannot be negative"));
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        product.variants = variants;

        const totalQty = variants.reduce((sum, v) => sum + (v.quantity || 0), 0);
        product.stockStatus = totalQty > 0 ? "In Stock" : "Out of Stock";

        await product.save();

        return res.status(200).json(
            new ApiResponse(200, product, "Variants and quantity updated successfully")
        );

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};

const updatePrice = async (req, res) => {
    try {
        const { productId, mrp, sale, currency } = req.body;

        const priceUpdate = {};

        if (mrp !== undefined) {
            if (mrp < 0) {
                return res.status(400).json(new ApiError(400, "MRP must be >= 0"));
            }
            priceUpdate["price.mrp"] = mrp;
        }

        if (sale !== undefined) {
            if (sale < 0) {
                return res.status(400).json(new ApiError(400, "Sale price must be >= 0"));
            }
            priceUpdate["price.sale"] = sale;
        }

        if (sale === null) {
            priceUpdate["price.sale"] = undefined; // removes sale price
        }

        if (currency) {
            priceUpdate["price.currency"] = currency;
        }

        if (
            mrp !== undefined &&
            sale !== undefined &&
            sale > mrp
        ) {
            return res.status(400).json(
                new ApiError(400, "Sale price must be <= MRP")
            );
        }

        const product = await productModel.findByIdAndUpdate(
            productId,
            { $set: priceUpdate },
            { new: true }
        );

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        return res.status(200).json(
            new ApiResponse(200, product, "Price updated successfully")
        );

    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};

const hardDeleteProduct = async (req, res) => {
    try {
        const { productId } = req.query;

        const product = await productModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        return res.status(200).json(new ApiResponse(200, null, "Product deleted permanently"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};

const softDeleteProduct = async (req, res) => {
    try {
        const { productId } = req.query;

        const updated = await productModel.findByIdAndUpdate(
            productId,
            {
                $set: { deleted: true, deletedAt: Date.now() }
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json(new ApiError(404, "Product not found"));
        }

        return res.status(200).json(new ApiResponse(200, updated, "Product moved to trash"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};

const restoreProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await productModel.findByIdAndUpdate(
            productId,
            { $set: { deleted: false, deletedAt: null } },
            { new: true }
        );

        if (!product) return res.status(404).json(new ApiError(404, "Product not found"));

        return res.status(200).json(new ApiResponse(200, product, "Product restored successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
};


export {uploadNewProduct, getAllItem, updateQuantity, updatePrice, hardDeleteProduct, softDeleteProduct, restoreProduct};