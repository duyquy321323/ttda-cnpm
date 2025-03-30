import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";
import './Register.css';
import userService from "../../services/userService";
import { toast } from "react-toastify";

const Register = () => {
    const [formRegister, setFormRegister] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [length] = useState(6);

    const [otp, setOtp] = useState("");
    function onComplete(){ 
    }
    
      const handleChangeOtp = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
        if (value.length > length) return;
    
        setOtp(value);
    
        if (value.length === length) {
          onComplete && onComplete(value);
        }
    
        // Giữ vị trí con trỏ đúng
        const cursorPos = e.target.selectionStart;
        setTimeout(() => {
          e.target.setSelectionRange(cursorPos, cursorPos);
        }, 0);
      };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await userService.register({...formRegister, otp});
            toast.success(res.data.message)
            navigate("/login")
        } catch (error) {

        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormRegister({
            ...formRegister,
            [name]: value,
        });
    };

    const handleSendOTP = async () => {
        try {
            const res = await userService.sendOtp({email: formRegister.email, isAccount: 0});
            console.log(res.data);
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
    };
}

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
                    <OTPInput name="otp" length={length} handleChange={handleChangeOtp} otp={otp} />

                    {/* Ô nhập mật khẩu */}
                    <PasswordField onChange={handleChange} name="password" title="Nhập mật khẩu..." />

                    {/* Ô xác nhận mật khẩu */}
                    <PasswordField onChange={handleChange} name="confirmPassword" title="Xác nhận lại mật khẩu..." />

                    {/* Nút đăng ký */}
                    <SubmitFormButton title="Đăng ký" type="submit"/>
                </form>
            </div>
        </>
    );
};

export default Register;
