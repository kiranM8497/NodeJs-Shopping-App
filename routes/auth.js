import express from "express";
import {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
  getReset,
} from "../Controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignUp);
router.post("/signup", postSignUp);
router.get("/reset", getReset);

export { router };
