import express from "express";
import { Login, Register } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post('/login',Login);
router.post('/register',Register);

export default router;