import express from "express";
import { signin, signup, addtocart, cartitems } from "../controllers/user.js";

const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/addtocart", addtocart);
router.post("/cartItems", cartitems);

export default router;
