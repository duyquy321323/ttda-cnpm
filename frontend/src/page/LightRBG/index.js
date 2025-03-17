import DenRBGImg from "../../assets/img/DenRGB.png";
import ColorPicker from "../../component/ColorPicker";
import IntroComponent from "../../component/IntroComponent";
import SwitchComponent from "../../component/SwitchComponent";
import TimeInput from "../../component/TimeInput";
import './LightRBG.css';

const LightRBG = () => {

    const title = "Đèn RBG";

    return (
        <>
            <div className="container--light container--3p">
                <IntroComponent title={title} icon={DenRBGImg}/>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Auto <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        <SwitchComponent/>
                    </div>
                </div>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Hẹn giờ tắt <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        {/* <div class="container__light--time">
                            <input type="time" name="time-off-light"/>
                            <p>OFF</p>
                        </div> */}
                        <TimeInput/>
                    </div>
                </div>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Tùy chỉnh màu <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        <ColorPicker/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LightRBG;