import express from "express";
import { getLogin, postLogin } from "../Controllers/auth.js";

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

export { router };
