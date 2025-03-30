import React, { useEffect, useState } from "react";
import fanservorelayIcon from "../../assets/img/notifications.png";
import "./Notification.css";
import api from "../../api";

const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await api.get("log/");
                setNotifications(response.data.logs);
            } catch (e){
                console.error(e);
            }
    };
    fetchData();
    }, []);

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
                                {notifications?.map((noti, index) => (
                                    <tr key={index}>
                                        <td style={{ color: "#00AEEF" }}>{formatDate(noti.time)}</td>
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