import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { tokensGenerator } from "../utils/auth.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    hashPassword: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = tokensGenerator({
    userID: user._id,
    role: user.role,
  });

  await userModel.findByIdAndUpdate(user._id, { refreshToken: refreshToken });

  res.cookie('refreshToken', refreshToken,{
    httpOnly:true,
  })

  return res.status(201).json({
    message: "User created successfully",
    user: {
        name: user.name,
        email: user.email
    },
    accessToken
  })
};
