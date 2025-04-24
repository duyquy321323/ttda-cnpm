import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../component/BackButton";
import OTPInput from "../../component/OTPInput";
import PasswordField from "../../component/PasswordField";
import SendOTPField from "../../component/SendOTPField";
import SubmitFormButton from "../../component/SubmitFormButton";
import "./ForgetPassword.css";
import userService from "../../services/userService";

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
    const [length] = useState(6);

    function onComplete(){ 
    }
    
      const handleChangeOtp = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Chỉ giữ số
        if (value.length > length) return;
    
        setForm({ ...form, otp: value });
    
        if (value.length === length) {
          onComplete && onComplete(value);
        }
    
        // Giữ vị trí con trỏ đúng
        const cursorPos = e.target.selectionStart;
        setTimeout(() => {
          e.target.setSelectionRange(cursorPos, cursorPos);
        }, 0);
      };

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

    const handleSendOTP = async () => {
        if (form.email.trim()) {
            try{
                await userService.sendOtp({ email: form.email, isAccount: 1 });
                alert(`Mã OTP đã được gửi đến email: ${form.email}`);
                setOtpSent(true);
                setTimer(180);
            } catch (e){
                console.error(e);
                alert("Gửi mã OTP thất bại!");
            }
        } else {
            alert("Vui lòng nhập email trước khi gửi OTP!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
        try{
            await userService.forgetPassword({ email: form.email, otp: form.otp, password: form.newPassword, confirmPassword: form.confirmPassword });
            alert("Đổi mật khẩu thành công!");
            navigate("/login");
        } catch (e){
            console.error(e);
            alert("Đổi mật khẩu thất bại!");
        }
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
                                length={length}
                                handleChange={handleChangeOtp}
                                otp={form.otp}
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
                        <SubmitFormButton title="Xác nhận" type="submit" />
                    </>
                )}
            </form>
        </div>
    );
};

export default ForgetPassword;