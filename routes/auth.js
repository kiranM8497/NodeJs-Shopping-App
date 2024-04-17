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
import { check, body } from "express-validator";
import User from "../models/user.js";

const router = express.Router();

router.get("/login", getLogin);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "password must be min 5 characters")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  postLogin
);
router.post("/logout", postLogout);
router.get("/signup", getSignUp);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a Valid Email")

      .custom((value, { req }) => {
        // if (value === "test123@gamil.com") {
        //   throw new Error("this email id forbidden");
        // }
        //return true;

        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "User with this email allready exists, please Login or use another email."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please Enter a password with only numbers and text with atleast 5 Characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  postSignUp
);
router.get("/reset", getReset);
router.post("/reset", postReset);
router.get("/reset/:token", resetPassword);
router.post("/reset-password", postResetpassword);

export { router };
