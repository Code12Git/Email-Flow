const _ = require("lodash");
const  { AppError } = require("../utils");
const {
  NOT_FOUND,
  INVALID_ACCESS_TOKEN,
  NO_AUTH_HEADER,
} = require("../utils/errors");
const { fromEnv } = require("../utils");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models");
const verifyToken = async (req, res, next) => {
  try {
     
     const { authorization } = req.headers;
     
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError(401, "Authorization header missing or invalid", 401);
    }

    // 2. Extract Token
    const accessToken = authorization.split(" ")[1];
     
    // 3. Verify Token
    try {
       const jwtSecret = fromEnv("SECRET_KEY");
      
      // DEBUG: Add these checks
      if (!jwtSecret) throw new Error("JWT_SECRET is empty or undefined");
 
      const decodedToken = jwt.verify(accessToken, jwtSecret);
 

      // 4. Finding User
       const user = await userModel.findOne({ email: decodedToken.email })
        .select('+active +verified')
        .lean();

      if (!user) throw new AppError(404, "User not found", 404);
      if (user.active === false) throw new AppError(403, "Account deactivated", 403);

      req.user = user;
      next();
    } catch (jwtError) {
      console.error('[JWT Verification Failed]', {
        name: jwtError.name,
        message: jwtError.message,
        secretUsed: process.env.JWT_SECRET ? 'exists' : 'missing',
        tokenHeader: accessToken.split('.')[0],
       });
      
      if (jwtError.name === "TokenExpiredError") {
        throw new AppError(401, "Token expired", 401);
      }
      throw new AppError(401, "Invalid token", 401);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {verifyToken};
