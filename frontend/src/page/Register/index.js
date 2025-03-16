import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";

const Register = () => {

    const [formRegister, setFormRegister] = useState({
            phoneNumber: '',
            password: '',
        });
    
        const navigate = useNavigate();
    
        const handleSubmit = (e) => {
            e.preventDefault();
        }
    
        const handChange = (e) => {
            const { name, value } = e.target;
            setFormRegister({
                ...formRegister,
                [name]: value,
            });
        }

        const handleSendOTP = async () => {

        }
    

    return (
        <>
            <div className="container--form">
                <div className="back-btn">
                    <BackButton title="Đăng nhập" navlink="/login"/>
                </div>
                <h1 className="container--form__title">
                    Đăng kí
                </h1>
                <h2 className="container--form__content">
                        <span>Lumi</span>
                        <span>Home </span> 
                        hân hạnh đồng hành cùng bạn!!!
                </h2>
                <form className="form" onSubmit={handleSubmit}>
                    <SendOTPField title="Nhập số điện thoại..." name="phoneNumber" onChange={handChange} type="number" onClickButton={handleSendOTP}/>
                    <OTPInput name="otp" onComplete={(otp) => {alert(`Mã OTP của bạn là: ${otp}`);}}/>
                    <PasswordField onChange={handChange} name="password" title="Nhập mật khẩu..." />
                    <PasswordField onChange={handChange} name="confirmPassword" title="Xác nhận lại mật khẩu..."/>
                    <SubmitFormButton title="Đăng kí"/>
                </form>
            </div>
        </>
    )
}

export default Register;