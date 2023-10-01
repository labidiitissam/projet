
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { jwt_key } from "../baseUrl.js";

const protect = async (req, res, next) => {
  // Get token from header
  let token = req.header("token");
  try {
    if (!token) {
      res.status(401).json({ Message: "Not authorized, no token" });
    } else {
      // Verify token
      const decoded = jwt.verify(token, jwt_key);
      // Get user from the token
      let user = await User.findOne({ _id: decoded.id });
     
      if (user) {
        req.user=user
        next();
      } else {
        res.status(401).json({ Message: "Not authorized" });
      }
    }
  } catch (error) {
    res.status(401).json({ Message: "Not authorized" });
  }
};

export default protect;