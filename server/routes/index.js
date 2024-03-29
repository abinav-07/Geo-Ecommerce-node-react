const express = require("express");
const multer = require('multer')
const router = express.Router();
const loginRoutes = require("../services/authentication/login");
const registerRoutes = require("../services/authentication/register");
const sellerProductsRoutes = require("../services/products/seller_products");
const getAllProductsRoutes = require("../services/products/get_all_products");
const getAllCustomerDetailsRoutes = require("../services/admin/admin_customer_details");
const updateUserRoutes = require("../services/user/update_user");
const messageRoutes = require("../services/messages/chat-messages");
const orderRoutes = require("../services/orders/user_orders");
const userDetailRoutes = require("../services/user/user_detail");
const chatBotRoutes = require("../services/chatBot");


const checkJWT = require("../middlewares/jwt");

//Multer Upload Directory
var multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assests/images/product_images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const uploadDirectory = multer({ storage: multerStorage });

//Authentication Routes
router.post("/users/login", loginRoutes.loginUser);
router.post("/users/register", registerRoutes.registerUser);

//Seller Routes
router.post("/users/add-seller-products", checkJWT, uploadDirectory.any(), sellerProductsRoutes.addSellerProducts);
router.get("/users/get-seller-products", checkJWT, sellerProductsRoutes.getAllSellerProducts);
router.get("/users/get-order-details", checkJWT, sellerProductsRoutes.getAllOrderDetails);
router.post("/users/delete-seller-product", sellerProductsRoutes.deleteSellerProduct);
router.post("/users/update-seller-product", checkJWT, sellerProductsRoutes.updateSellerProduct);
router.post("/users/update-seller-paid-values", checkJWT, sellerProductsRoutes.updateSellerPaidDeliveredValues);

//All Products
router.get("/products/get-all-products", checkJWT, getAllProductsRoutes.getAllProducts);
router.get("/products/get-all-users-products", checkJWT, getAllProductsRoutes.getAllUsersProducts);

//Admin Routes
router.get("/admin/get-all-customer-details", getAllCustomerDetailsRoutes.getAllCustomerDetails);
router.post("/admin/delete-customer", getAllCustomerDetailsRoutes.deleteCustomer);

//User Routes
router.get("/users/user-details", checkJWT, userDetailRoutes.getUserDetail);
router.post("/users/update-application-rating", checkJWT, updateUserRoutes.updateApplicationRating);
router.get("/users/get-user-address", checkJWT, userDetailRoutes.getUserAddress);
router.post("/users/update-profile", checkJWT, updateUserRoutes.updateUserProfile);
router.post("/users/update-password", checkJWT, updateUserRoutes.updateUserPassword);
router.get("/users/get-user-email", checkJWT, userDetailRoutes.getUserEmail);
router.post("/users/add-product-review", checkJWT, userDetailRoutes.addReviews);

//Message Routes
router.get("/users/chat-messages", checkJWT, messageRoutes.getRoomMessages);
router.post("/users/send-message-email", checkJWT, messageRoutes.sendMessageEmail);

//Order Routes
router.post("/users/register-order", checkJWT, orderRoutes.registerOrder);

//ChatBot Routes
router.post("/chat-bot/train-model", chatBotRoutes.trainModel);
router.post("/chat-bot/reply", chatBotRoutes.chatReply);

module.exports = router;