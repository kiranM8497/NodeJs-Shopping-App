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
import { authentication } from "../middleware/is-auth.js";

const router = express.Router();

router.get("/add-product", authentication, getAddProduct);

router.get("/products", authentication, getProducts);

router.post("/add-product", authentication, postAddProduct);
router.get("/edit-product/:productId", authentication, getEditProduct);
router.post("/edit-product", authentication, postEditProduct);
router.post("/delete-product", authentication, deleteProduct);

export { router };
