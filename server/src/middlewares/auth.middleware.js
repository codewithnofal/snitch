import { verifyAccessToken } from "../utils/auth.js";

export const authanticate = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[ 1 ]
  console.log(accessToken);

  if (!accessToken) {
    return res.status(400).json({
      message: "Access Token not fount ",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or epired access token",
    });
  }
};
