import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const Layout = () => {
    return (
        <>
            <Header/>
                <main>
                    <Outlet/>
                </main>
            <Footer/>
        </>
    )
}

export default Layout;