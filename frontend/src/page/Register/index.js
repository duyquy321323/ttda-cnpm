import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";
import './Register.css';

const Register = () => {
    const [formRegister, setFormRegister] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dữ liệu đăng ký:", formRegister);
    };

    const handleChange = (e) => {
        console.log("Input changed:", e.target.name, e.target.value);
        const { name, value } = e.target;
        setFormRegister({
            ...formRegister,
            [name]: value,
        });
    };

    const handleSendOTP = async () => {
        // Xử lý gửi OTP
    };

    return (
        <>
            <div className="container--form">
                <div className="back-btn">
                    <BackButton title="Đăng nhập" navlink="/login"/>
                </div>
                <h1 className="container--form__title">Đăng ký</h1>
                <h2 className="container--form__content">
                    <span>Lumi</span>
                    <span>Home </span> 
                    hân hạnh đồng hành cùng bạn!!!
                </h2>
                <form className="form" onSubmit={handleSubmit}>
                    {/* Ô nhập họ tên */}
                    <div className="input-container">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nhập họ tên..."
                            value={formRegister.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Ô nhập số điện thoại */}
                    <div className="input-container">
                        <input
                            type="number"
                            name="phone"
                            placeholder="Nhập số điện thoại..."
                            value={formRegister.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Ô nhập email + gửi OTP */}
                    <SendOTPField title="Nhập email..." name="email" onChange={handleChange} type="email" onClickButton={handleSendOTP}/>


                    {/* Ô nhập mã OTP */}
                    <OTPInput name="otp" onComplete={(otp) => { alert(`Mã OTP của bạn là: ${otp}`); }} />

                    {/* Ô nhập mật khẩu */}
                    <PasswordField onChange={handleChange} name="password" title="Nhập mật khẩu..." />

                    {/* Ô xác nhận mật khẩu */}
                    <PasswordField onChange={handleChange} name="confirmPassword" title="Xác nhận lại mật khẩu..." />

                    {/* Nút đăng ký */}
                    <SubmitFormButton title="Đăng ký"/>
                </form>
            </div>
        </>
    );
};

export default Register;
