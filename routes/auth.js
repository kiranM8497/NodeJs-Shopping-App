import express from "express";
import getLogin from "../Controllers/auth";
const router = express.Router();

router.get("/Login", getLogin);

export { router };
