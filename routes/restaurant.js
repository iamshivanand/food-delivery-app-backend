import express from "express";
import { getRestaurants } from "../controllers/restaurant.js";

const router = express.Router();

router.get("/all-restaurants", getRestaurants);
export default router;
