const JWT = require('jsonwebtoken');
require('dotenv').config();
const JWTSECURE_KEY = process.env.JWTSECURE_KEY;
const User = require("../models/userModal")

async function generateJWT(item) {
  return JWT.sign({ _id: item }, JWTSECURE_KEY);
 };

  const verifyTokenForSuperAdmin = async (req, res, next) => {
    try {
      const token = req.headers['authorization'];
      if(!token){
        return res.status(400).json({
          success: false,
          message: "Token not found",
      });
      }
      const decoded = JWT.verify(token, JWTSECURE_KEY);
      const user = await User.findById(decoded._id);
      if(user.role !== "super_admin"){
        return res.status(400).json({
          success: false,
          message: "Access denied, Only Super Adming have access to this route.",
      });
      }
      next();
  } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const verifyTokenForUser = async (req, res, next) => {
  try {
      const token = req.headers['authorization'];
      if(!token){
          return res.status(400).json({
              success: false,
              message: "Token not found",
          });
      }
      const decoded = JWT.verify(token, JWTSECURE_KEY);
      const user = await User.findById(decoded._id);
      req.userId = user._id; 
      next();
  } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { generateJWT, verifyTokenForSuperAdmin , verifyTokenForUser};