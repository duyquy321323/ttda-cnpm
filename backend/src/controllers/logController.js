const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");
const db = require("../db"); // Kết nối database

const COLOR_MAP = {
    blue: "Màu xanh dương",
    white: "Màu trắng",
    red: "Màu đỏ",
    black: "Màu đen",
    green: "Màu xanh lá",
    yellow: "Màu vàng",
    orange: "Màu cam",
    purple: "Màu tím",
};

const log = async (req, res, next) => {
  try {
    const [rowsRBG] = await db.query("SELECT * FROM rgb_lights ORDER BY changed_at DESC");
    const [rowsRELAY] = await db.query("SELECT * FROM relay ORDER BY changed_at DESC");
    const [rowsDOOR] = await db.query("SELECT * FROM door ORDER BY changed_at DESC");
    const [rowsFAN] = await db.query("SELECT * FROM fan ORDER BY changed_at DESC");

    // làm tương tự với bảng door, relay, fan

    rowsRBG.forEach((row) => {
      row.device = "LED_RGB";
      row.state = COLOR_MAP[row.color];
      row.result = "Thành công";
      delete row.color;
    });

    rowsRELAY.forEach((row) => {
        row.device = "RELAY";
        row.state = row.state === 1 ? "Bật" : "Tắt";
      row.result = "Thành công";
    });

    rowsDOOR.forEach((row) => {
        row.device = "SERVO_DOOR";
        row.state = row.state === 1 ? "Mở" : "Đóng";
      row.result = "Thành công";
    });

    rowsFAN.forEach((row) => {
        row.device = "FAN";
        row.state = row.speed;
      row.result = "Thành công";
      delete row.speed;
    });

    const logs = [...rowsRBG, ...rowsRELAY, ...rowsDOOR, ...rowsFAN];
    logs.sort((a, b) => new Date(a.changed_at) - new Date(b.changed_at));
    res.status(StatusCodes.OK).json({ logs });

  } catch (error) {
    next(error);
  }
};

module.exports = { log };
