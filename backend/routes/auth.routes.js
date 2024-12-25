import express from "express";
import { signup } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { logout } from "../controllers/auth.controllers.js";
import {drop} from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.delete("/drop",protectRoute,drop)


export default router;