import React, { useState } from 'react';
import BackButton from '../../component/BackButton';
import PasswordField from '../../component/PasswordField';
import SubmitFormButton from '../../component/SubmitFormButton';
import TextFieldForm from '../../component/TextFieldForm';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formLogin, setFormLogin] = useState({
        phoneNumber: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value,
        });
    }

    return (
        <>
            <div className="container--form">
                <div className="back-btn">
                    <BackButton title="Trang chủ" navlink="/"/>
                </div>
                <h1 className="container--form__title">
                    Đăng nhập
                </h1>
                <h2 className="container--form__content">
                        <span>Lum</span>
                        <span>Home </span> 
                        xin chào!!!
                </h2>
                <form className="form" onSubmit={handleSubmit}>
                    <TextFieldForm title="Nhập số điện thoại..." name="phoneNumber" onChange={handChange} />
                    <PasswordField onChange={handChange} />
                    <div className="navigation">
                        <p onClick={() => navigate("/forget-password")}>Quên mật khẩu?</p>
                        <p onClick={() => navigate("/register")}>Chưa có tài khoản?</p>
                    </div>
                    <SubmitFormButton title="Đăng nhập"/>
                </form>
            </div>
        </>
    )
}

export default Login;