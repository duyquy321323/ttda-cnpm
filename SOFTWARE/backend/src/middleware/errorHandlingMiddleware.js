const { StatusCodes } = require("http-status-codes");

const errorHandlingMiddleware = (err, req, res, next) => {
  // Nếu dev không cẩn thận thiếu StatusCode thì mặc định sẽ để code 500
  if (!err.statusCode)
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Tạo ra một biến responseError để kiểm soát những gì trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu không có message thì lấy ReasonPhrases chuẩn theo mã StatusCode
    stack: err.stack
  }

  res.status(responseError.statusCode).json(responseError)
}

module.exports = errorHandlingMiddleware