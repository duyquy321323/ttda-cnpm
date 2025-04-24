import React, { useState, useRef } from "react";
import doorIcon from "../../assets/img/door.svg";
import fanIcon from "../../assets/img/fan.svg";
import fanservorelayIcon from "../../assets/img/fanservorelay.svg";
import relayIcon from "../../assets/img/relay.svg";
import "./FanRelayServo.css";
import { useEffect } from "react";
const FanRelayServo = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [autoFan, setAutoFan] = useState(false);
    const [autoDoor, setAutoDoor] = useState(false);
    const [isOn1, setIsOn1] = useState(false);
    const [isOn2, setIsOn2] = useState(false);
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        const controller = new AbortController();
    
        const interval = setInterval(() => {
            fetch("http://localhost:8080/fan-relay-servo", { signal: controller.signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.fan !== undefined) setSliderValue(data.fan);
                    if (data.autoFan !== undefined) setAutoFan(data.autoFan);
                    if (data.autoDoor !== undefined) setAutoDoor(data.autoDoor);
                    if (data.door !== undefined) setIsOn1(data.door);
                    if (data.relay !== undefined) {
                        setIsOn2(data.relay);
                        console.log(data.relay);
                    }
                })
                .catch(err => {
                    if (err.name !== "AbortError") {
                        console.error('Lỗi Fetch:', err);
                    }
                });
        }, 1000); 
    
        return () => {
            controller.abort();
            clearInterval(interval);
        };
    }, []);

    const sendControlData = (updatedData) => {
        fetch("http://localhost:8080/fan-relay-servo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => console.log("Response:", data))
            .catch(error => console.error("Error:", error));
    };

    const handleSliderChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            sendControlData({ fan: parseInt(newValue) });
        }, 1000);
    };

    const toggleSwitch1 = () => {
        setIsOn1((prevState) => {
            const newState = !prevState;
            sendControlData({ door: newState });
            return newState;
        });
    };

    const toggleSwitchAutoDoor = () => {
        setAutoDoor((prevState) => {
            const newState = !prevState;
            sendControlData({ autoDoor: newState });
            return newState;
        });
    };

    const toggleSwitchAutoFan = () => {
        setAutoFan((prevState) => {
            const newState = !prevState;
            sendControlData({ autoFan: newState });
            return newState;
        });
    };

    const toggleSwitch2 = () => {
        setIsOn2((prevState) => {
            const newState = !prevState;
            sendControlData({ relay: newState });
            return newState;
        });
    };

    return (
        <div className="container--fanrelayservo">
            <div className="intro">
                <div className="logo">
                    <img src={fanservorelayIcon} alt="Fan Door Relay Icon" className="icon" />
                </div>
                <h1 className="introTitle">
                    QUẠT MINI - RELAY - SERVO CỬA
                </h1>
                <p className="introText">
                    <span style={{ color: "var(--orangecolor)" }}>Lumi</span><span style={{ color: "var(--violetcolor)" }}>Home</span> hỗ trợ điều khiển <span style={{ color: 'var(--violetcolor)' }}>"Quạt Mini - Relay - Servo Cửa"</span>!
                </p>
            </div>

            <div className="body">
                {/* Quạt Mini */}
                <div className="section">
                    <div className="iconContainer">
                        <img src={fanIcon} alt="Fan Icon" className="icon" />
                    </div>
                    <h2 className="sectionTitle">
                        Điều chỉnh tốc độ & Auto <span style={{ color: "var(--violetcolor)" }}>Quạt Mini:</span>
                    </h2>
                    <div className="sliderContainer">
                        <span className="minText">Min</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                        <span className="maxText">Max</span>
                    </div>
                    <div className="autoContainer">
                        <button className={`toggleButton ${autoFan ? "on" : "off"}`} onClick={toggleSwitchAutoFan}>
                            <div className="toggleCircle" style={{ transform: autoFan ? "translateX(50px)" : "translateX(0)" }} />
                        </button>
                    </div>
                </div>

                {/* Servo Cửa */}
                <div className="section">
                    <h2 className="sectionTitle">
                        Bật / Tắt & Auto <span style={{ color: "var(--violetcolor)" }}>Servo Cửa:</span>
                    </h2>
                    <button className={`toggleButton ${isOn1 ? "on" : "off"}`} onClick={toggleSwitch1}>
                        <div className="toggleCircle" style={{ transform: isOn1 ? "translateX(50px)" : "translateX(0)" }} />
                    </button>
                    <div className="autoContainer">
                        <button className={`toggleButton ${autoDoor ? "on" : "off"}`} onClick={toggleSwitchAutoDoor}>
                            <div className="toggleCircle" style={{ transform: autoDoor ? "translateX(50px)" : "translateX(0)" }} />
                        </button>
                    </div>
                    <div className="iconContainer">
                        <img src={doorIcon} alt="Door Icon" className="icon" />
                    </div>
                </div>

                {/* Relay */}
                <div className="section">
                    <div className="iconContainer">
                        <img src={relayIcon} alt="Relay Icon" className="icon" />
                    </div>
                    <h2 className="sectionTitle">
                        Bật / Tắt <span style={{ color: "var(--violetcolor)" }}>Relay:</span>
                    </h2>
                    <button className={`toggleButton ${isOn2 ? "on" : "off"}`} onClick={toggleSwitch2}>
                        <div className="toggleCircle" style={{ transform: isOn2 ? "translateX(50px)" : "translateX(0)" }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FanRelayServo;
