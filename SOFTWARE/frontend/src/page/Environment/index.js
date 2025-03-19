import { useState, useEffect } from "react";
//import { Slider } from "@mui/material";
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

    const [environmentData, setEnvironmentData] = useState({
        temperature: 0,
        humidity: 0,
        light: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/environment");
                const data = await response.json();
                setEnvironmentData(data);
            } catch (error) {
                console.error("Error fetching environment data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container--environment container--3p">
            <IntroComponent title={title} icon={EnvironmentImg} />

            <div className="container--slide">
                <div className="align-left">
                    <div className="logo">
                        <img src={TemperatureImg} alt="Temperature" />
                    </div>
                    <p>Nhiệt độ: {environmentData.temperature}°C</p>
                    <div className="slide">
                        <img src={BlueTempImg} alt="BlueTemp" />
                        <Slide min={-40} max={80} value={environmentData.temperature}
                            color="linear-gradient(90deg, #00AEEF 0%, #FF3B30 100%)"
                            title="Temperature"
                        />
                        <img src={RedTempImg} alt="RedTemp" />
                    </div>
                </div>

                <div className="align-right">
                    <div className="left">
                        <div className="top">
                            <p>Độ ẩm: {environmentData.humidity}%</p>
                            <div className="slide">
                                <Slide min={0} max={100} value={environmentData.humidity}
                                    color="linear-gradient(90deg, #FF4015 0%, #34C759 30%, #00AEEF 60%, #9747FF 80%)"
                                    title="Humidity"
                                />
                            </div>
                        </div>
                        <div className="bottom">
                            {environmentData.humidity < 30 && (
                                <span className="warning">
                                    CẢNH BÁO: Không khí quá khô! Có thể gây khô da, khó chịu khi hô hấp, tăng nguy cơ cháy nổ.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="logo">
                        <img src={HumidityImg} alt="Humidity" />
                    </div>
                </div>

                <div className="align-left">
                    <div className="logo">
                        <img src={LightImg} alt="Light" />
                    </div>
                    <div className="right">
                        <div className="top">
                            <p>Ánh sáng: {environmentData.light}%</p>
                            <div className="slide">
                                <Slide min={0} max={100} value={environmentData.light}
                                    color="linear-gradient(90deg, #121212 0%, #FF3B30 10%, #34C759 30%, #00AEEF 70%, #FFC107 90%)"
                                    title="Light"
                                />
                            </div>
                        </div>
                        <div className="bottom">
                            {environmentData.light < 20 && (
                                <span className="warning">
                                    CẢNH BÁO: Có nguy cơ gây mỏi mắt và không an toàn, cần tăng cường độ sáng.
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Environment;
