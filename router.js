const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller");


const router = express.Router();

router.route("/product").post(controller.createProduct).get(controller.getProduct)
// router.route("/product").get(controller.getProduct)
router.route("/cart").post( controller.addToCart).get(controller.viewCart)
// router.route("/cart")
router.route("/checkout").post(controller.checkout)



module.exports = router