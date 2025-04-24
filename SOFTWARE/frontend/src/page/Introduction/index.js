import React from "react";
import fanservorelayIcon from "../../assets/img/Info.png";
import "./Introduction.css";

const Introduction = () => {
    return (
        <div className="container--introduction">
            {/* Intro */}
            <div className = "intro">
                <div className = "logo">
                    <img src={fanservorelayIcon} alt="Info Icon" className="icon" />
                </div>
                <h1 className = "introTitle">
                    GIỚI THIỆU
                </h1>
                <p className = "introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span>hân hạnh được giới thiệu đến bạn về hệ thống nhà ở thông minh của chúng tôi!
                </p>
            </div>

            {/* Main Content */}
            <div className="intro-content">
                <img src={require("../../assets/img/logo.png")} alt="LumiHome Logo" className="content-logo" />
                <p>
                <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> là sự kết hợp giữa <span style={{ color: "var(--orangecolor)" }}>"Luminous"</span> (tỏa sáng) và <span style={{ color: "var(--violetcolor)" }}>"Home"</span> (tổ ấm), thể hiện mong muốn mang đến cho khách hàng một không gian sống hiện đại, tiện nghi và thông minh. Với các giải pháp công nghệ tiên tiến, <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> không chỉ giúp tối ưu hóa sự tiện lợi trong sinh hoạt hàng ngày mà còn nâng cao chất lượng cuộc sống, đảm bảo an ninh và tiết kiệm năng lượng.
                </p>
                <p>
                <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> là hệ thống nhà ở thông minh, hiện đại, cho phép điều khiển và quản lý thiết bị từ xa qua nền tảng website. Hệ thống mang lại sự tiện lợi, tối ưu hóa năng lượng, tiết kiệm chi phí và bảo vệ môi trường nhờ vào các cảm biến và hệ thống tự động, Đặc biệt, các giải pháp an ninh thông minh như camera giám sát, khóa điện tử và cảm biến an toàn giúp nâng cao mức độ bảo vệ, mang lại sự yên tâm cho gia chủ, ngay cả khi vắng nhà.
                </p>
            </div>
        </div>
    );
};

export default Introduction;