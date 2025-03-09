import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import Connect from "../page/Connect";
import ForgetPassword from "../page/ForgetPassword";
import Home from "../page/Home";
import InformationAccount from "../page/InformationAccount";
import Introduction from "../page/Introduction";
import LightRBG from "../page/LightRBG";
import Login from "../page/Login";
import MiniFan from "../page/MiniFan";
import Register from "../page/Register";
import Relay from "../page/Relay";
import Remote from "../page/Remote";
import Sensor from "../page/Sensor";
import Servo from "../page/Servo";

const Routes = () => {
    const route = useRoutes([
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/information-account',
                    element: <InformationAccount/>
                },
                {
                    path: '/connect',
                    element: <Connect/>
                },
                {
                    path: '/introduction',
                    element: <Introduction/>
                },
                {
                    path: '/light-rbg',
                    element: <LightRBG/>
                },
                {
                    path: '/mini-fan',
                    element: <MiniFan/>
                },
                {
                    path: '/relay',
                    element: <Relay/>
                },
                {
                    path: '/servo',
                    element: <Servo/>
                },
                {
                    path: '/sensor',
                    element: <Sensor/>
                },
                {
                    path: '/remote',
                    element: <Remote/>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/register',
                    element: <Register/>
                },
                {
                    path: '/forget-password',
                    element: <ForgetPassword/>
                }
            ]
        }
    ]);
    return route;
}

export default Routes;