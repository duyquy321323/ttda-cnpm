import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";
import "./ForgetPassword.css";

const ForgetPassword = () => {
    const [form, setForm] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(120);
    const navigate = useNavigate();

    useEffect(() => {
        let countdown;
        if (otpSent && timer > 0) {
            countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(countdown);
    }, [otpSent, timer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSendOTP = () => {
        if (form.email.trim()) {
            alert(`Mã OTP đã được gửi đến email: ${form.email}`);
            setOtpSent(true);
            setTimer(120);
        } else {
            alert("Vui lòng nhập email trước khi gửi OTP!");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        alert("Đặt lại mật khẩu thành công!");
        navigate("/login");
    };

    return (
        <div className="container--form">
            <div className="back-btn">
                <BackButton title="Đăng nhập" navlink="/login" />
            </div>
            <h1 className="container--form__title">Quên mật khẩu</h1>
            <h2 className="container--form__content">
                Vui lòng nhập email để <span className="orange-text">Lumi</span>
                <span className="violet-text">Home</span> hỗ trợ bạn!!!
            </h2>
            <form className="form" onSubmit={handleSubmit}>
                <SendOTPField
                    title="Nhập email..."
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email} 
                    onChange={(e) => {
                        console.log("Email changed:", e.target.value);
                        setForm({ ...form, email: e.target.value });
                    }}
                    onClickButton={() => {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(form.email)) {
                            alert("Vui lòng nhập đúng định dạng email!");
                            return;
                        }
                        handleSendOTP();
                    }}
                />
                {otpSent && (
                    <>
                        <div className="otp-container">
                            <OTPInput
                                name="otp"
                                value={form.otp}
                                onChange={(otp) => setForm({ ...form, otp })}
                            />
                        </div>
                        <p className="otp-info">
                            Mã xác thực gồm 6 chữ số sẽ được gửi đến email của bạn.
                        </p>
                        <p className="resend-otp">
                            Gửi lại OTP ({Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")})
                        </p>
                        <PasswordField
                            name="newPassword"
                            title="Nhập mật khẩu mới..."
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                        <PasswordField
                            name="confirmPassword"
                            title="Nhập lại mật khẩu mới..."
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        <SubmitFormButton title="Xác nhận" />
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgetPassword;