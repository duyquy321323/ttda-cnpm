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
        auto: false,
        timer_off: "",
        color: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "auto"){
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
    }
    const [time, setTime] = useState(dayjs().set("hour", 1).set("minute", 0));


    useEffect(() => {
        async function fetchData() {
            try{
                console.log(isOn? {...formRq, timer_off: dayjs(time).format("HH:mm")} : formRq)
                const response = await api.post("light-rbg/", isOn? {...formRq, timer_off: dayjs(time).format("HH:mm")} : formRq);
                setFormRq(response.data.ledState);
            } catch (e){
                console.error(e);
            }
        }

        fetchData();
    }, [time, isOn, formRq.auto, formRq.color]);


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