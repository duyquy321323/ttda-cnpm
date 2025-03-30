import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";

const Register = () => {

    const [formRegister, setFormRegister] = useState({
            email: '',
            password: '',
        });
    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        console.log("Input changed:", e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormRegister({
            ...formRegister,
            [name]: value,
        });
    };
    

    const handleSendOTP = async () => {

    }

    return (
        <>
            <div className="container--form">
                <div className="back-btn">
                    <BackButton title="Đăng nhập" navlink="/login"/>
                </div>
                <h1 className="container--form__title">
                    Đăng ký
                </h1>
                <h2 className="container--form__content">
                        <span>Lumi</span>
                        <span>Home </span> 
                        hân hạnh đồng hành cùng bạn!!!
                </h2>
                <form className="form" onSubmit={handleSubmit}>
                    <SendOTPField title="Nhập email..." name="email" onChange={handleChange} type="email" onClickButton={handleSendOTP}/>
                    <OTPInput name="otp" onComplete={(otp) => {alert(`Mã OTP của bạn là: ${otp}`);}}/>
                    <PasswordField onChange={handleChange} name="password" title="Nhập mật khẩu..." />
                    <PasswordField onChange={handleChange} name="confirmPassword" title="Xác nhận lại mật khẩu..."/>
                    <SubmitFormButton title="Đăng ký"/>
                </form>
            </div>
        </>
    )
}

export default Register;