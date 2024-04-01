import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  fetchProducts,
  getIndexPage,
  getCartDetails,
  getOrderDetails,
  fetchProductDetails,
  postCart,
  deleteProductFromCart,
  postOrder,
} from "../Controllers/shop.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", getIndexPage);
router.get("/products", fetchProducts);
router.get("/products/:productId", fetchProductDetails);
router.get("/cart", getCartDetails);
router.post("/cart", postCart);
router.get("/orders", getOrderDetails);
router.post("/cart-delete-item", deleteProductFromCart);
router.post("/create-order", postOrder);

export default router;
