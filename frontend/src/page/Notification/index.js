import React from "react";
import fanservorelayIcon from "../../assets/img/notifications.png";
import "./Notification.css";

const notifications = [
    { time: "2025/03/11 10:16:02AM", result: "Thất bại", device: "SERVO_DOOR", status: "Tắt", resultColor: "#FF2D55", statusColor: "#FF2D55" },
    { time: "2025/03/11 10:15:52AM", result: "Thành công", device: "RELAY", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thành công", device: "SERVO_DOOR", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thất bại", device: "LED_RGB", status: "#0000FF", resultColor: "#FF2D55", statusColor: "#0000FF" },
    { time: "2025/03/11 10:15:48AM", result: "Thất bại", device: "LED_RGB", status: "#FFFFFF", resultColor: "#FF2D55", statusColor: "#FFFFFF" },
    { time: "2025/03/11 10:16:02AM", result: "Thất bại", device: "SERVO_DOOR", status: "Tắt", resultColor: "#FF2D55", statusColor: "#FF2D55" },
    { time: "2025/03/11 10:15:52AM", result: "Thành công", device: "RELAY", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thành công", device: "SERVO_DOOR", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thất bại", device: "LED_RGB", status: "#0000FF", resultColor: "#FF2D55", statusColor: "#0000FF" },
    { time: "2025/03/11 10:15:48AM", result: "Thất bại", device: "LED_RGB", status: "#FFFFFF", resultColor: "#FF2D55", statusColor: "#FFFFFF" },
    { time: "2025/03/11 10:16:02AM", result: "Thất bại", device: "SERVO_DOOR", status: "Tắt", resultColor: "#FF2D55", statusColor: "#FF2D55" },
    { time: "2025/03/11 10:15:52AM", result: "Thành công", device: "RELAY", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thành công", device: "SERVO_DOOR", status: "Bật", resultColor: "#34C759", statusColor: "#34C759" },
    { time: "2025/03/11 10:15:49AM", result: "Thất bại", device: "LED_RGB", status: "#0000FF", resultColor: "#FF2D55", statusColor: "#0000FF" },
    { time: "2025/03/11 10:15:48AM", result: "Thất bại", device: "LED_RGB", status: "#FFFFFF", resultColor: "#FF2D55", statusColor: "#FFFFFF" },
];

const Notification = () => {
    return (
        <div className="container--notification">
            {/* Intro */}
            <div className="intro">
                <div className="logo">
                    <img src={fanservorelayIcon} alt="Notification Icon" className="icon" />
                </div>
                <h1 className="introTitle">THÔNG BÁO</h1>
                <p className="introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span>
                    <span style={{ color: "var(--violetcolor)" }}>Home</span> hân hạnh được hỗ trợ 
                    <span style={{ color: "var(--violetcolor)" }}>"Thông báo"</span> để lưu trữ lịch sử sử dụng hệ thống nhà của bạn!
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
                                {notifications.map((noti, index) => (
                                    <tr key={index}>
                                        <td style={{ color: "#00AEEF" }}>{noti.time}</td>
                                        <td style={{ color: noti.resultColor }}>{noti.result}</td>
                                        <td style={{ color: "#00AEEF" }}>{noti.device}</td>
                                        <td style={{ color: noti.statusColor }}>{noti.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;