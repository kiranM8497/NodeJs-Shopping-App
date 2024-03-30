import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  postAddProduct,
  getAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
} from "../Controllers/admin.js";
const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.post("/add-product", postAddProduct);
router.get("/edit-product/:productId", getEditProduct);
router.post("/edit-product", postEditProduct);
router.post("/delete-product", deleteProduct);

export { router };
