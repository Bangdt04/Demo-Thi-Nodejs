import Product from "../models/product";

export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({products})
    } catch (error) {
        console.log(error)
    }
}
export const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.parmas.id);
        return res.status(200).json({product})
    } catch (error) {
        console.log(error)
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.parmas.id);
        return res.status(200).json({product})
    } catch (error) {
        console.log(error)
    }
}
export const add = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        return res.status(200).json({product})
    } catch (error) {
        console.log(error)
    }
}
export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.parmas.id, req.body, {new : true});
        return res.status(200).json({product})
    } catch (error) {
        console.log(error)
    }
}