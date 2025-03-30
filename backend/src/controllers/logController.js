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
      row.status = COLOR_MAP[row.color];
      row.result = "Thành công";
      row.resultColor = row.result === "Thành công" ? "#34C759" : "#FF2D55";
      row.time = row.changed_at;
      row.statusColor = row.color;
      delete row.changed_at;
      delete row.color;
    });

    rowsRELAY.forEach((row) => {
        row.device = "RELAY";
        row.status = row.state === 1 ? "Bật" : "Tắt";
        row.result = "Thành công";
        row.time = row.changed_at;
        row.statusColor = row.state === 1 ? "#34C759" : "#FF2D55";
        row.resultColor = row.result === "Thành công" ? "#34C759" : "#FF2D55";
        delete row.state;
      delete row.changed_at;
    });

    rowsDOOR.forEach((row) => {
        row.device = "SERVO_DOOR";
        row.status = row.state === 1 ? "Mở" : "Đóng";
        row.statusColor = row.state === 1 ? "#34C759" : "#FF2D55";
        delete row.state;
      row.result = "Thành công";
      row.resultColor = row.result === "Thành công" ? "#34C759" : "#FF2D55";
      row.time = row.changed_at;
      delete row.changed_at;
    });

    rowsFAN.forEach((row) => {
        row.device = "FAN";
        row.status = row.speed;
      row.result = "Thành công";
      row.statusColor = row.status > 0 ? "#34C759" : "#FF2D55";
      row.resultColor = row.result === "Thành công" ? "#34C759" : "#FF2D55";
      row.time = row.changed_at;
      delete row.changed_at;
      delete row.speed;
    });

    const logs = [...rowsRBG, ...rowsRELAY, ...rowsDOOR, ...rowsFAN];
    logs.sort((a, b) => new Date(a.time) - new Date(b.time));
    res.status(StatusCodes.OK).json({ logs });

  } catch (error) {
    next(error);
  }
};

module.exports = { log };
