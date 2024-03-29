const Products = require("../../queries/products");

const getAllProducts = async (req, res) => {
    try {
        if (!req.query.user_id) {
            res.status(401).json({ message: "Missing user_id in query!" });
        } else {
            const getAllProductsData = await Products.getAllProducts(req.query.user_id);
            res.status(200).json(getAllProductsData);
        }
    } catch (err) {
        console.log(err);
    }
}

const getAllUsersProducts = async (req, res) => {
    const getAllUsersProductsData = await Products.getAllUsersProducts();
    res.status(200).json(getAllUsersProductsData);
}

module.exports = {
    getAllProducts,
    getAllUsersProducts
}