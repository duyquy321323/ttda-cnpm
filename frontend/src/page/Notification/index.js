import React from "react";
import fanservorelayIcon from "../../assets/img/notifications.png";
import "./Notification.css";

const Notification = () => {
    return (
        <div className="container--notification">
            {/* Intro */}
            <div className = "intro">
                <div className = "logo">
                    <img src={fanservorelayIcon} alt="Notification Icon" className="icon" />
                </div>
                <h1 className = "introTitle">
                    THÔNG BÁO
                </h1>
                <p className = "introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> hân hạnh được hỗ trợ <span style={{ color: "var(--violetcolor)" }}>"Thông báo"</span> để lưu trữ lịch sử sử dụng hệ thống nhà của bạn!
                </p>
            </div>

            {/* Main Content */}
            <div className="noti-content">
                <div className="scroll-container">
                    <div className="table-wrapper">
                        <table className="notification-table">
                            <thead>
                                <tr>
                                    <th>THỜI GIAN</th>
                                    <th>KẾT QUẢ</th>
                                    <th>THIẾT BỊ</th>
                                    <th>TRẠNG THÁI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:16:02AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#FF2D55" }}>Tắt</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:52AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>RELAY</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#0000FF" }}>#0000FF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:48AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#FFFFFFF" }}>#FFFFFF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:16:02AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#FF2D55" }}>Tắt</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:52AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>RELAY</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#0000FF" }}>#0000FF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:48AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#FFFFFFF" }}>#FFFFFF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:16:02AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#FF2D55" }}>Tắt</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:52AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>RELAY</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#0000FF" }}>#0000FF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:48AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#FFFFFFF" }}>#FFFFFF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:16:02AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#FF2D55" }}>Tắt</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:52AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>RELAY</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#34C759" }}>Thành công</td>
                                    <td style={{ color: "#00AEEF" }}>SERVO_DOOR</td>
                                    <td style={{ color: "#34C759" }}>Bật</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:49AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#0000FF" }}>#0000FF</td>
                                </tr>
                                <tr>
                                    <td style={{ color: "#00AEEF" }}>2025/03/11 10:15:48AM</td>
                                    <td style={{ color: "#FF2D55" }}>Thất bại</td>
                                    <td style={{ color: "#00AEEF" }}>LED_RGB</td>
                                    <td style={{ color: "#FFFFFFF" }}>#FFFFFF</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;