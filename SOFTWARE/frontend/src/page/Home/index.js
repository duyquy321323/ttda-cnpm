import { useNavigate } from "react-router-dom";
import LightImg from "../../assets/img/DenRGB.png";
import EnvironmentImg from "../../assets/img/Environment.png";
import FanRelayServoImg from "../../assets/img/FanRelayServo.png";
import NotificationImg from "../../assets/img/Notification.png";
import UserImg from "../../assets/img/TaiKhoan.png";
import "./Home.css";

const Home = () => {

    const navigate = useNavigate();
    const tabList = [
        {
            path: '/information-account',
            icon: UserImg,
            title: "Tài khoản",
        },
        {
            path: '/light-rbg',
            icon: LightImg,
            title: "Đèn RGB",
        },
        {
            path: '/environment',
            icon: EnvironmentImg,
            title: "Môi trường",
        },
        {
            path: '/notification',
            icon: NotificationImg,
            title: "Thông báo",
        },
        {
            path: '/fan-relay-servo',
            icon: FanRelayServoImg,
            title: "Quạt - Relay - Cửa",
        },
    ]

    return (
        <>
            <div className="container--3p container--home">
                {
                    tabList.map(item =>
                        <div className="container--tab" onClick={() => navigate(item.path)}>
                            <div className="logo">
                                <img src={item.icon} alt={item.icon}/>
                            </div>
                            <h2>{item.title}</h2>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Home;