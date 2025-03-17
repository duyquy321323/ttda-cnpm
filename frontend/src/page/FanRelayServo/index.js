import React, { useState } from "react";
import doorIcon from "../../assets/img/door.svg";
import fanIcon from "../../assets/img/fan.svg";
import fanservorelayIcon from "../../assets/img/fanservorelay.svg";
import relayIcon from "../../assets/img/relay.svg";
import "./FanRelayServo.css";

const FanRelayServo = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const [isOn1, setIsOn1] = useState(false);
    const toggleSwitch1 = () => {
        setIsOn1((prevState) => !prevState);
    };

    const [isOn2, setIsOn2] = useState(false);
    const toggleSwitch2 = () => {
        setIsOn2((prevState) => !prevState);
    };
    
    return (
        <div className = "container--fanrelayservo">
            {/* Intro */}
            <div className = "intro">
                <div className = "logo">
                    <img src={fanservorelayIcon} alt="Fan Door Relay Icon" className="icon" />
                </div>
                <h1 className = "introTitle">
                    QUẠT MINI - RELAY - SERVO CỬA
                </h1>
                <p className = "introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> hân hạnh được hỗ trợ điều khiển <span style={{color: 'var(--violetcolor)'}}>"Quạt Mini - Relay - Servo Cửa"</span> trong hệ thống nhà của bạn!
                </p>
            </div>

            {/* Body */}
            <div className = "body">
                {/* Quạt Mini */}
                <div className = "section">
                    <div className="iconContainer">
                        <img src={fanIcon} alt="Fan Icon" className="icon" />
                    </div>
                    <h2 className="sectionTitle">
                        Điều chỉnh tốc độ <span style={{ color: "var(--violetcolor)" }}>Quạt Mini:</span>
                    </h2>
                    <div className = "sliderContainer">
                        <span className = "minText">
                            Min
                        </span>
                        <input 
                            type="range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                        <span className = "maxText">
                            Max
                        </span>
                    </div>
                </div>

                {/* Servo Cửa */}
                <div className = "section">
                    <h2 className = "sectionTitle">
                        Bật / Tắt <span style={{ color: "var(--violetcolor)" }}>Servo Cửa:</span>
                    </h2>
                    <button className={`toggleButton ${isOn1 ? "on" : "off"}`} onClick={toggleSwitch1}>
                        <div className="toggleCircle" style={{ transform: isOn1? "translateX(50px)" : "translateX(0)" }} />
                    </button>
                    <div className = "iconContainer">
                        <img src={doorIcon} alt="Door Icon" className="icon" />
                    </div>
                </div>

                {/* Relay */}
                <div className = "section">
                    <div className = "iconContainer">
                        <img src={relayIcon} alt="Relay Icon" className="icon" />
                    </div>
                    <h2 className = "sectionTitle">
                        Bật / Tắt <span style={{ color: "var(--violetcolor)" }}>Relay:</span>
                    </h2>
                    <button className={`toggleButton ${isOn2 ? "on" : "off"}`} onClick={toggleSwitch2}>
                        <div className="toggleCircle" style={{ transform: isOn2? "translateX(50px)" : "translateX(0)" }} />
                    </button>
                </div>

                
            </div>
        </div>
    )
}

export default FanRelayServo;