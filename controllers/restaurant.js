import { response } from "express";
import Restaurant from "../models/restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const results = await Restaurant.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(404).json(err);
  }
};
