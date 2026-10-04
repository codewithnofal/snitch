import cartModel from "../models/cart.model";

export const addToCartController = async (req, res) => {
    const {productId, quantity, size} = req.body;

    const product = await cartModel.findById(productId);

    if(!product){
        return res.status(404).json({
            message: "Product Not Found"
        })
    }

    const selectedSize = product.sizes.find(s => s.size === size)

    if(!selectedSize){
        return res.status(400).json({
            message: "Invalid size"
        })
    }
    if(selectedSize.stock < quantity){
        return res.status(400).json({
            message: "insufficiant stock"
        })
    }

    
}