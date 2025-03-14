import { useRoutes } from "react-router-dom";
import Layout from "../layout";
import Environment from "../page/Environment";
import FanRelayServo from "../page/FanRelayServo";
import ForgetPassword from "../page/ForgetPassword";
import Home from "../page/Home";
import InformationAccount from "../page/InformationAccount";
import Introduction from "../page/Introduction";
import LightRBG from "../page/LightRBG";
import Login from "../page/Login";
import NotFound from "../page/NotFound";
import Notification from "../page/Notification";
import Register from "../page/Register";

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
                    path: '/environment',
                    element: <Environment/>
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
                    path: '/fan-relay-servo',
                    element: <FanRelayServo/>
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
                },
                {
                    path: '/notification',
                    element: <Notification/>
                }
            ]
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ]);
    return route;
}

export default Routes;