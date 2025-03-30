import React from "react";
import { useNavigate } from "react-router-dom";
import avatarIcon from "../../assets/img/avatar.png";
import userIcon from "../../assets/img/AvatarPlaceholder.png";
import mailIcon from "../../assets/img/mail.png";
import phoneIcon from "../../assets/img/Phone.png";
import passIcon from "../../assets/img/pass.png";
import LogOutIcon from "../../assets/img/LogOut.png";
import "./InformationAccount.css";

const InformationAccount = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        sessionStorage.clear();
        navigate("/login");
    };

    const handleChangePassword = () => {
        navigate("/forget-password"); 
    };

    return (
        <div className="container--infoacc">
            {/* Intro */}
            <div className = "intro">
                <div className = "logo">
                    <img src={avatarIcon} alt="Avatar Icon" className="icon" />
                </div>
                <h1 className = "introTitle">
                    TÀI KHOẢN
                </h1>
                <p className = "introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span>xin chào Trương Nguyễn Minh Nhiên!!!
                </p>
            </div>

            {/* Main Content */}
            <div className="infoacc-content">
                {/* Họ tên */}
                <div className="info-item">
                    <div className="icon-circle">
                        <img src={userIcon} alt="User Icon" className="icon-img" />
                    </div>
                    <p><span style={{ color: "var(--violetcolor)" }}>Họ tên:</span> Trương Nguyễn Minh Nhiên</p>
                </div>

                {/* Email & Số điện thoại */}
                <div className="info-row">
                    <div className="info-item">
                        <div className="icon-circle">
                            <img src={mailIcon} alt="Email Icon" className="icon-img" />
                        </div>
                        <p><span style={{ color: "var(--violetcolor)" }}>Email:</span> nhien.truongcs111204@hcmut.edu.vn</p>
                    </div>

                    <div className="info-item">
                        <div className="icon-circle">
                            <img src={phoneIcon} alt="Phone Icon" className="icon-img" />
                        </div>
                        <p><span style={{ color: "var(--violetcolor)" }}>Số điện thoại:</span> 0941234567</p>
                    </div>
                </div>

                {/* Đổi mật khẩu */}
                <div className="info-item" onClick={handleChangePassword} style={{ cursor: "pointer" }}>
                    <div className="icon-circle">
                        <img src={passIcon} alt="Pass Icon" className="icon-img" />
                    </div>
                    <p><span style={{ color: "var(--violetcolor)" }}>Đổi mật khẩu</span></p>
                </div>

                <hr className="divider" />

                {/* Đăng xuất */}
                <div className="info-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <div className="icon-circle">
                        <img src={LogOutIcon} alt="LogOut Icon" className="icon-img" />
                    </div>
                    <p><span style={{ color: "var(--violetcolor)" }}>Đăng xuất</span></p>
                </div>
            </div>
        </div>
    );
};

export default InformationAccount;