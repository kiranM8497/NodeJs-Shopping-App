import express from "express";
import {
  getLogin,
  postLogin,
  postLogout,
  getSignUp,
  postSignUp,
  getReset,
  postReset,
  resetPassword,
  postResetpassword,
} from "../Controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignUp);
router.post("/signup", postSignUp);
router.get("/reset", getReset);
router.post("/reset", postReset);
router.get("/reset/:token", resetPassword);
router.post("/reset-password", postResetpassword);

export { router };
