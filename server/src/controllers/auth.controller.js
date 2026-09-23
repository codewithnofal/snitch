import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { tokensGenerator, verifyRefreshToken } from "../utils/auth.js";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exist with this email address",
      errors: [
        {
          path: "email",
          msg: "User already exist with this email address",
        },
      ],
    });
  }

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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  return res.status(201).json({
    message: "User created successfully",
    user: {
      name: user.name,
      email: user.email,
    },
    accessToken,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashPassword);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const { accessToken, refreshToken } = tokensGenerator({
    userID: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate(
    {
      email,
    },
    { refreshToken },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User LoggedIn successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
};

export const getMe = async (req, res) => {
  const { userID, role } = req.user;

  const user = await userModel.findById(userID);

  return res.status(200).json({
    message: "details fatched successfully",
    data: {
      user: {
        id: user.id,
        name: user.name,
        user: user.email,
      },
    },
  });
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh token not found",
    });
  }

  try {
    const { userID, role } = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(userID);

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(
        user._id,
        {
          refreshToken: null,
        },
      );
      return res.status(400).json({
        message: "suspicious operation preforms",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = tokensGenerator({
      userID: userID,
      role: role,
    });

    

    await userModel.findByIdAndUpdate(
     user._id,
      { refreshToken: newRefreshToken },
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    return res.status(200).json({
      message: "new tokens generated",
      accessToken,
    });

  } catch (error) {
    return res.status(400).json({
      message: "invalid refresh token",
    });
  }
};
