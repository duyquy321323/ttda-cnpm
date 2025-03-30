const { StatusCodes } = require("http-status-codes");
const JWTProvider = require("../Provider/JWTProvider");



const isAuthorized = async (req, res, next) => {
  // Cách 1: Lấy access token nằm trong request cookies phía client - withCtredentials trong file authorizeAxios và credentials trong CORS
  const accessTokenFromCookie = req.cookies?.accessToken;

  if (!accessTokenFromCookie) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZED! (Token not account)' });
    return;
  }

  try {
    // Verify token
    const accessTokenDecoded = await JWTProvider.verifyToken(accessTokenFromCookie, process.env.ACCESS_SECRET_SIGNATURE);
    req.jwtDecoded = accessTokenDecoded;

    next();
  } catch (error) {
    // Nếu cái accessToken hết hạn
    console.log(error);
    if (error?.message?.includes("jwt expired")) {
      res.status(StatusCodes.GONE).json({ message: 'Need to refresh token!' });
      return;
    }

    // Nếu accessToken không hợp lệ
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'UNAUTHORIZTION! (Please login)' });
  }
}


const authMiddleware = {
  isAuthorized
}

module.exports = authMiddleware
