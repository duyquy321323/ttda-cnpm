const { StatusCodes } = require("http-status-codes")
const ApiError = require("../utils/ApiError");
const { generateNumber } = require("../helpers/generate");
const sendEmail = require("../helpers/sendEmail");
const ms = require("ms");
const JWTProvider = require("../Provider/JWTProvider");
const db = require("../db"); // Kết nối database

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    // Truy vấn user theo email
    const [rows] = await db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [email], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại!");
        }
      }
    );
    const user = rows[0];
    if (user.username !== req.body.email || user.password !== req.body.password) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Your email or password is incorrect!" });
      return;
    }

    const [roles] = await db.query("SELECT * FROM role WHERE role_id = ? LIMIT 1", [user.role_id], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản chưa được phân quyền!");
        }
      }
    );

    // Tạo payload
    const userInfo = {
      email: email,
      id: user.id,
      role: roles[0].name,
    }

    // Tạo accessToken và refreshToken để trả về phía Fe
    const accessToken = await JWTProvider.generateToken(
      userInfo,
      process.env.ACCESS_SECRET_SIGNATURE,
      // '1h'
      5
    );

    const refreshToken = await JWTProvider.generateToken(
      userInfo,
      process.env.REFRESH_SECRET_SIGNATURE,
      // '14 days'
      15
    );

    // Trả về http only cookie bên trình duyệt
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms("14 days")
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms("14 days")
    });

    res.status(StatusCodes.OK).json({
      ...userInfo
    });
  } catch (error) {
    next(error)
  }

}

const register = async (req, res, next) => {
  try {
    const { password, confirmPassword, email, otp } = req.body;

    if (password !== confirmPassword) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Mật khẩu không khớp!" })
    }

    const [rows] = await db.query("SELECT * FROM otp WHERE email = ? AND code = ? LIMIT 1", [email, otp],
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
        }
      }
    );

    const now = new Date();
    const before3Minutes = new Date(now.getTime() - 3 * 60 * 1000);
    if (rows.length === 0 || rows[0].expiry_time < before3Minutes) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
    }

    db.query("INSERT INTO users(username, password, role_id) VALUES (?, ?, ?);", [email, password, 1], 
      (err, results) => {
      if (err) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Đăng ký thất bại!");
      }
    });

    // Lưu vào database
    res.status(StatusCodes.OK).json({ message: "Ok" })
  } catch (error) {
    next(error)
  }
}

const sendtOtp = async (req, res, next) => {
  try {
    const { email, isAccount } = req.body

    if(isAccount){
      const [rows] = await db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [email], 
        (err, results) => {
          if (err) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại!");
          }
        }
      );

      if(rows.length === 0){
        throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "Tài khoản không tồn tại!");
      }
    }

    if (!email) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "Email không tồn tại!");
    }

    const [rows] = await db.query("SELECT * FROM otp WHERE email = ? LIMIT 1", [email], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại!");
        }
      }
    );

    const otp = generateNumber(6);
    let queryCommand = "INSERT INTO otp(code, expiry_time, email) VALUES (?, ?, ?);";
    if(rows.length > 0){
      queryCommand = "UPDATE otp SET code = ?, expiry_time = ? WHERE email = ?";
    }

    db.query(queryCommand, [otp, new Date(), email], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Gửi mã otp thất bại!");
        }
      }
    );

    const subject = "Xác minh tài khoản";
    const html = `
      <h3>Mã otp đã được gửi: <strong>${otp}</strong></h3>
      <h3>Lưu ý mã otp này sử dụng 3 phút</h3>
    `

    sendEmail(email, subject, html)
    res.status(StatusCodes.OK).json({ message: "Ok" })
  } catch (error) {
    next(error)
  }
}

const logout = (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công!" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

const refreshToken = async (req, res) => {
  try {
    const refreshTokenFromCookie = req.cookies?.refreshToken;

    const refreshTokenDecoded = await JwtProvider.verifyToken(refreshTokenFromCookie, process.env.REFRESH_SECRET_SIGNATURE);

    const userInfo = {
      email: refreshTokenDecoded.email
    }

    const accessToken = await JwtProvider.generateToken(userInfo, process.env.ACCESS_SECRET_SIGNATURE, 5);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days')
    });

    res.status(StatusCodes.OK).json({ accessToken: accessToken });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Refresh Token failed" });
  }
}

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const [rowsAccount] = await db.query("SELECT * FROM users WHERE username = ? LIMIT 1", [email], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Tài khoản không tồn tại!");
        }
      }
    );

    if(rowsAccount.length === 0){
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Tài khoản không tồn tại!" })
    }

    const [rows] = await db.query("SELECT * FROM otp WHERE email = ? AND code = ? LIMIT 1", [email, otp],
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
        }
      }
    );

    const now = new Date();
    const before3Minutes = new Date(now.getTime() - 3 * 60 * 1000);
    if (rows.length === 0 || rows[0].expiry_time < before3Minutes) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
    }

    res.status(StatusCodes.OK).json({ message: "Ok" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Verify failed" });
  }
}

const forgetPassword = async (req, res) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Mật khẩu không khớp!" })
    }

    const [rows] = await db.query("SELECT * FROM otp WHERE email = ? AND code = ? LIMIT 1", [email, otp],
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
        }
      }
    );

    const now = new Date();
    const before3Minutes = new Date(now.getTime() - 3 * 60 * 1000);
    if (rows.length === 0 || rows[0].expiry_time < before3Minutes) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Mã otp không hợp lệ!");
    }

    db.query("UPDATE users SET password = ? WHERE username = ?", [password, email], 
      (err, results) => {
        if (err) {
          throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Cập nhật mật khẩu thất bại!");
        }
      }
    );

    res.status(StatusCodes.OK).json({ message: "Ok" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Reset password failed" });
  }
}

module.exports = { login, verifyOtp, forgetPassword, register, sendtOtp, logout, refreshToken }