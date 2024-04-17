import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { body, check } from "express-validator";

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

router.post(
  "/add-product",
  [
    check("title").isString().isLength({ min: 3 }),

    body("imageUrl").isURL().trim(),
    body("price").isNumeric(),
    body("description").isString().trim().isLength({ min: 3, max: 200 }),
  ],
  authentication,
  postAddProduct
);
router.get("/edit-product/:productId", authentication, getEditProduct);
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }),
    body("price").isNumeric(),
    body("description").isString().trim().isLength({ min: 5, max: 200 }),
  ],
  authentication,
  postEditProduct
);
router.post("/delete-product", authentication, deleteProduct);

export { router };
