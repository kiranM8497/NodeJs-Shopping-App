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
import { authentication } from "../middleware/is-auth.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.get("/", getIndexPage);
router.get("/products", fetchProducts);
router.get("/products/:productId", fetchProductDetails);
router.get("/cart", authentication, getCartDetails);
router.post("/cart", authentication, postCart);
router.get("/orders", authentication, getOrderDetails);
router.post("/cart-delete-item", authentication, deleteProductFromCart);
router.post("/create-order", authentication, postOrder);

export default router;
