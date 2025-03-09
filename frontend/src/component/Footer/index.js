import { AiOutlineHome } from "react-icons/ai";
import { MdMailOutline, MdOutlinePhone } from "react-icons/md";
import Logo from "../../assets/img/logo.svg";
import "./Footer.css";

const Footer = () => {
    return (
        <>
            <section className="container--footer">
                <div className="left--footer">
                    <p><span>LumiHome</span> là hệ thống nhà ở với công nghệ hiện đại được điều khiển và quản lý từ xa.</p>
                    <p><span><MdOutlinePhone size={48}/></span> (+84) 987654321</p>
                    <p><span><AiOutlineHome size={48}/></span> Tp. Thủ Đức, TP. Hồ Chí Minh</p>
                    <p><span><MdMailOutline size={48}/></span> lumihome@gmail.com</p>
                </div>
                <div className="right--footer">
                    <img src={Logo} alt={"Logo"}/>
                </div>
            </section>
        </>
    )
}

export default Footer;