import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(200).json({ message: "user doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(200).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;
 
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(200)
        .json({ message: "user already exist please login" });
    if (password !== confirmPassword) {
      return res.status(200).json({ message: "Password don't match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password: hashedPassword, name });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
export const addtocart = async (req, res) => {
  const { id: _id, cartItems } = req.body;

  // console.log("CartItem", cartItems);
  try {
    const existingUser = await User.findOne({ _id });

    if (!existingUser) {
      return res.status(200).json({ message: "Please Sign In First!!" });
    }
    const updatedCart = await User.findByIdAndUpdate(
      _id,
      {
        cart: cartItems,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ result: updatedCart });
  } catch (error) {
    res.status(500).json({ message: "Someting went wrong" });
  }
};
export const cartitems = async (req, res) => {
  const { id: _id } = req.body;

  try {
    const existingUser = await User.findOne({ _id });
   
    if (!existingUser) {
      return res.status(200).json({ message: "Please Sign In First!!" });
    }
    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
