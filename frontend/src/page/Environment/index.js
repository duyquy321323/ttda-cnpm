import { Slider } from "@mui/material";
import BlueTempImg from "../../assets/img/BlueTemp.png";
import EnvironmentImg from "../../assets/img/Environment.png";
import HumidityImg from "../../assets/img/Humidity.png";
import LightImg from "../../assets/img/Light.png";
import RedTempImg from "../../assets/img/RedTemp.png";
import TemperatureImg from "../../assets/img/Temperature.png";
import IntroComponent from "../../component/IntroComponent";
import Slide from "../../component/Slide";
import "./Environment.css";

const Environment = () => {

    const title = "Môi trường";

    return (
        <>
            <div className="container--environment container--3p">
                <IntroComponent title={title} icon={EnvironmentImg}/>
                <div className="container--slide">
                    <div className="align-left">
                        <div className="logo">
                            <img src={TemperatureImg} alt={TemperatureImg}/>
                        </div>
                        <p>Nhiệt độ: </p>
                        <div className="slide">
                            <img src={BlueTempImg} alt={BlueTempImg}/>
                            <Slide min={-40} max={80} color="linear-gradient(90deg, #00AEEF 0%, #FF3B30 100%)" title="Temperature"/>
                            <img src={RedTempImg} alt={RedTempImg}/>
                        </div>
                    </div>
                    <div className="align-right">
                        <div className="left">
                            <div className="top">
                                <p>Độ ẩm: </p>
                                <div className="slide">
                                    <Slide min={0} max={100} color="linear-gradient(90deg, #FF4015 0%, #34C759 30%, #00AEEF 60%, #9747FF 80%)" title="Humidity"/>
                                </div>
                            </div>
                            <div className="bottom">
                                CẢNH BÁO: Không khí quá khô! Có thể gây khô da, khó chịu khi hô hấp, tăng nguy cơ cháy nổ.
                            </div>
                        </div>
                        <div className="logo">
                            <img src={HumidityImg} alt={HumidityImg}/>
                        </div>
                    </div>
                    <div className="align-left">
                        <div className="logo">
                            <img src={LightImg} alt={LightImg}/>
                        </div>
                        <div className="right">
                            <div className="top">
                                <p>Ánh sáng: </p>
                                <div className="slide">
                                    <Slide color="linear-gradient(90deg, #121212 0%, #FF3B30 10%, #34C759 30%, #00AEEF 70%, #FFC107 90%)" title="Light" min={0} max={100}/>
                                </div>
                            </div>
                            <div className="bottom">
                                CẢNH BÁO: Có nguy cơ gây mỏi mắt và không an toàn, cần tăng cường độ sáng. 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Environment;