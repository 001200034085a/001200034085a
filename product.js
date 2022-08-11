const express = require("express");
const { getAllProduct, postProduct, getProductById, deleteProduct, putProduct } = require("../controller/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// 1.
// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get("/",getAllProduct)

// 2.
// @desc: post products
// @route: post /api/products
// @access: Public/admin
router.post("/", protect, isAdmin, postProduct);

// 3.
// @desc: get products
// @route: get /api/products/:id
// @access: Public/admin
router.get("/:id", protect, isAdmin, getProductById);

// 4.
// @desc: delete products
// @route: delete /api/products/:id
// @access: Public/admin
router.delete("/:id", protect, isAdmin, deleteProduct);

// 5.
// @desc: put products
// @route: put /api/products/:id
// @access: Public/admin
router.put("/:id", protect, isAdmin,putProduct)
module.exports = router;
