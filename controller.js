const Product = require("./models/product.js")
const CartItem = require("./models/cartItem.js")

// import { Product, CartItem } from './models.js';

// Add a new product
exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await Product.create({ name, price });
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.getProduct = async (req,res) => {
    let product = await Product.find().select("-__v")
    return res.status(200).json({
        message: "Success",
        data:{
            product
        }
    })
}

// Add a product to the cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const cartItem = await CartItem.create({ product, quantity });
    res.status(201).json({ message: 'Item added to cart successfully', cartItem });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
};

// View cart contents
exports.viewCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    res.status(200).json({ message: 'Success', data: { cart: cartItems } });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart items', error: err.message });
  }
};

// Checkout and clear the cart
exports.checkout = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'The cart is empty' });
    }

    // Calculate the total amount
    const totalAmount = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

    // In a real-world application, you might perform additional actions here, such as processing payment or creating an order record.

    // Clear the cart after successful checkout
    await CartItem.deleteMany({});
    res.status(200).json({ message: 'Checkout successful', totalAmount });
  } catch (err) {
    res.status(500).json({ message: 'Error during checkout', error: err.message });
  }
};

// module.exports = { createProduct, addToCart, viewCart };
