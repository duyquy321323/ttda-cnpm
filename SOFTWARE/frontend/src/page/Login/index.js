import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../component/BackButton';
import PasswordField from '../../component/PasswordField';
import SubmitFormButton from '../../component/SubmitFormButton';
import TextFieldForm from '../../component/TextFieldForm';
import userService from '../../services/userService'
import { useDispatch } from "react-redux"
import './Login.css';
import { loginSuccess } from '../../redux/action';

const Login = () => {
    const dispatch = useDispatch();
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await userService.login(formLogin);
            dispatch(loginSuccess(res.data))

            navigate("/")
        } catch (error) {
            
        }

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
                    <BackButton title="Trang chủ" navlink="/" />
                </div>
                <h1 className="container--form__title">
                    Đăng nhập
                </h1>
                <h2 className="container--form__content">
                    <span>Lumi</span>
                    <span>Home </span>
                    xin chào!!!
                </h2>
                <form className="form" onSubmit={handleSubmit}>
                    <TextFieldForm title="Nhập số điện thoại..." name="email" onChange={handChange} />
                    <PasswordField onChange={handChange} name="password" title="Nhập mật khẩu..." />
                    <div className="navigation">
                        <p onClick={() => navigate("/forget-password")}>Quên mật khẩu?</p>
                        <p onClick={() => navigate("/register")}>Chưa có tài khoản?</p>
                    </div>
                    <SubmitFormButton title="Đăng nhập" type="submit" />
                </form>
            </div>
        </>
    )
}

export default Login;