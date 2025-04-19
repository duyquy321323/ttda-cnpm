import { useEffect, useState } from "react";
import DenRBGImg from "../../assets/img/DenRGB.png";
import ColorPicker from "../../component/ColorPicker";
import IntroComponent from "../../component/IntroComponent";
import SwitchComponent from "../../component/SwitchComponent";
import TimeInput from "../../component/TimeInput";
import './LightRBG.css';
import api from "../../api";
import dayjs from "dayjs";

const LightRBG = () => {
    const title = "Đèn RBG";

    const [isOn, setIsOn] = useState(true);

    const [formRq, setFormRq] = useState({
        color: "black",
        auto: false,
        timer_off: "00:90",
    });
    useEffect(() => {
        const controller = new AbortController();
    
        const interval = setInterval(() => {
            fetch("http://localhost:8080/light-rbg", { signal: controller.signal })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.color !== undefined) {
                        setFormRq(prev => ({ ...prev, color: data.color }));
                    }
                    if (data.auto !== undefined) {
                        setFormRq(prev => ({ ...prev, auto: data.auto }));
                    }
                    if (data.timer_off !== undefined) {
                        setFormRq(prev => ({ ...prev, timer_off: data.timer_off }));
                    }
                })
                .catch(err => {
                    if (err.name !== "AbortError") {
                        console.error("Lỗi Fetch:", err);
                    }
                });
        }, 1000); // lấy mỗi 1 giây
    
        return () => {
            controller.abort();
            clearInterval(interval);
        };
    }, []);
    const [time, setTime] = useState("");
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "auto") {
            const { checked } = e.target;
            setFormRq({
                ...formRq,
                [name]: checked,
            });
        } else {
            setFormRq({
                ...formRq,
                [name]: value,
            });
        }
    };

    useEffect(() => {
        const sendAuto = async () => {
            try {
                const response = await api.post("light-rbg/", { auto: formRq.auto });
                setFormRq(prev => ({ ...prev, auto: response.data.ledState.auto }));
            } catch (e) {
                console.error(e);
            }
        };
        sendAuto();
    }, [formRq.auto]);

    useEffect(() => {
        const sendColor = async () => {
            try {
                const response = await api.post("light-rbg/", { color: formRq.color });
                setFormRq(prev => ({ ...prev, color: response.data.ledState.color }));
            } catch (e) {
                console.error(e);
            }
        };
        sendColor();
    }, [formRq.color]);

    useEffect(() => {
        const sendTimer = async () => {
            if (!isOn || !time) return;
                try {
                    const formattedTime = dayjs(time).format("HH:mm");
                    const response = await api.post("light-rbg/", { timer_off: formattedTime });
                    setFormRq(prev => ({ ...prev, timer_off: response.data.ledState.timer_off }));
                } catch (e) {
                    console.error(e);
                }
        };
        sendTimer();
    }, [time, isOn]);


    return (
        <>
            <div className="container--light container--3p">
                <IntroComponent title={title} icon={DenRBGImg}/>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Auto <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        <SwitchComponent name="auto" handleChange={handleChange} value={formRq.auto} />
                    </div>
                </div>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Hẹn giờ tắt <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        <TimeInput value={time} handleChange={(newTime) => setTime(newTime)} isOn={isOn} setIsOn={setIsOn}/>
                    </div>
                </div>
                <div className="container--3p__component--field">
                    <div className="title">
                        <p>Tùy chỉnh màu <span>{title}: </span></p>
                    </div>
                    <div className="content">
                        <ColorPicker selectedColor={formRq.color} handleChange={handleChange}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LightRBG;