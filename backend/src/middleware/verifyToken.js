const { AppError } = require("../utils");
const { fromEnv } = require("../utils");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError(401, "Authorization header missing or invalid", 401);
    }

    // Extract Token
    const accessToken = authorization.split(" ")[1];
    
    if (!accessToken) {
      throw new AppError(401, "Access token missing", 401);
    }

    // Verify Token
    try {
      const jwtSecret = fromEnv("SECRET_KEY");
      
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is empty or undefined");
      }

      const decodedToken = jwt.verify(accessToken, jwtSecret);

      // Finding User
      const user = await userModel.findOne({ email: decodedToken.email });

      if (!user) {
        throw new AppError(404, "User not found", 404);
      }
      if (user.active === false) {
        throw new AppError(403, "Account deactivated", 403);
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.error('[JWT Verification Failed]', {
        name: jwtError.name,
        message: jwtError.message,
        secretUsed: fromEnv('SECRET_KEY') ? 'exists' : 'missing',
        tokenHeader: accessToken ? accessToken.split('.')[0] : 'no token',
      });
      
      if (jwtError.name === "TokenExpiredError") {
        throw new AppError(401, "Token expired", 401);
      }
      if (jwtError.name === "JsonWebTokenError") {
        throw new AppError(401, "Invalid token", 401);
      }
      throw new AppError(401, "Authentication failed", 401);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyToken };