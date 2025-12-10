import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
  const access_token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const refresh_token = jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { access_token, refresh_token };
};