import { useEffect, useState } from "react";
import api from "../../api";
import BlueTempImg from "../../assets/img/BlueTemp.png";
import EnvironmentImg from "../../assets/img/Environment.png";
import HumidityImg from "../../assets/img/Humidity.png";
import LightImg from "../../assets/img/Light.png";
import RedTempImg from "../../assets/img/RedTemp.png";
import TemperatureImg from "../../assets/img/Temperature.png";
import Chart from "../../component/Chart";
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

    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const [lightData, setLightData] = useState([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080"); // thay bằng đúng địa chỉ server
      
        ws.onopen = () => {
          console.log("🟢 WebSocket connected");
        };
      
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setEnvironmentData(data); // Lưu vào state để render
        };
      
        ws.onclose = () => {
          console.log("🔴 WebSocket disconnected");
        };
      
        return () => {
          ws.close();
        };
      }, []);

    useEffect(() => {

        async function getTemperature24h() {
            try {
                const response = await api.get("/environment/temperature-24h");
                setTemperatureData(Array.from(response.data).map((item) => ({
                    value: item.temperature,
                    recorded_at: item.recorded_at,
                })));
            } catch (error) {
                console.error("Error fetching 24h temperature data:", error);
            }
        }

        async function getHumidity24h() {
            try {
                const response = await api.get("/environment/humidity-24h");
                setHumidityData(Array.from(response.data).map((item) => ({
                    value: item.humidity,
                    recorded_at: item.recorded_at,
                })));
            } catch (error) {
                console.error("Error fetching 24h humidity data:", error);
            }
        }

        async function getLight24h() {
            try {
                const response = await api.get("/environment/light-24h");
                setLightData(Array.from(response.data).map((item) => ({
                    value: item.light_level,
                    recorded_at: item.recorded_at,
                })));
            } catch (error) {
                console.error("Error fetching 24h light data:", error);
            }
        }

        getLight24h();
        getHumidity24h();
        getTemperature24h();
    }, []);

    return (
        <div className="container--environment container--3p">
            <IntroComponent title={title} icon={EnvironmentImg} />

            <div className="container--slide">
                <div className="align-left">
                <div className="logo">
                        <img src={TemperatureImg} alt="Temperature" />
                    </div>
                    <div className="right">
                    <div className="top">
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
                    <div className="bottom">
                        {environmentData.temperature < 10 && (
                            <span className="warning">
                                CẢNH BÁO: Nhiệt độ quá thấp, có nguy cơ cảm lạnh, cần ấm áp hơn.
                            </span>
                        )}
                        {environmentData.temperature > 35 && (
                            <span className="warning">
                                CẢNH BÁO: Nhiệt độ quá cao, có nguy cơ bị say nắng, sốt nóng.
                            </span>
                        )}
                        </div>
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
                            {environmentData.humidity >= 30 && environmentData.humidity < 60 && (
                                <span className="warning">
                                    THÔNG BÁO: Mức lý tưởng! Không khí tốt cho sức khỏe và thiết bị. 
                                </span>
                            )}
                            {environmentData.humidity >= 60 && environmentData.humidity < 80 && (
                                <span className="warning">
                                    THÔNG BÁO: Độ ẩm cao! Cẩn thận nấm mốc và vi khuẩn phát triển. Hãy kiểm tra thông gió, hút ẩm nếu cần.
                                </span>
                            )}
                            {environmentData.humidity >= 80 && (
                                <span className="warning">
                                    CẢNH BÁO:  Nguy hiểm! Không khí quá ẩm, dễ gây ẩm mốc, hư hỏng thiết bị điện tử.
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
                            {environmentData.light < 10 && (
                                <span className="warning">
                                    CẢNH BÁO: Có nguy cơ gây mỏi mắt và không an toàn, cần tăng cường độ sáng.
                                </span>
                            )}

                            {/* 10 - 30% (đỏ): "CẢNH BÁO: Dễ gây mệt mỏi khi đọc sách hoặc làm việc trong thời gian dài." */}

                            {environmentData.light >= 10 && environmentData.light < 30 && (
                                <span className="warning">
                                    CẢNH BÁO: Dễ gây mệt mỏi khi đọc sách hoặc làm việc trong thời gian dài.
                                </span> 
                            )}

                            {environmentData.light >= 30 && environmentData.light < 70  && (
                                <span className="warning">
                                    THÔNG BÁO: tốt.
                                </span> 
                            )}

                            {environmentData.light >= 70 && environmentData.light < 90 && (
                                <span className="warning">
                                    CẢNH BÁO: Có thể gây chói mắt nếu duy trì trong thời gian dài.
                                </span> 
                            )}
                            
                            {environmentData.light >= 90 && (
                                <span className="warning">
                                    Có thể gây khó chịu và ảnh hưởng đến thị lực, do đó nên điều chỉnh để giảm cường độ sáng nếu cần.
                                </span> 
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <Chart name="Biểu đồ nhiệt độ" data={temperatureData}/>
            <Chart name="Biểu đồ độ ẩm" data={humidityData}/>
            <Chart name="Biểu đồ ánh sáng" data={lightData}/>
        </div>
    );
};

export default Environment;
