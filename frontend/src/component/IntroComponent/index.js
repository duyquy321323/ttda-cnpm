import './IntroComponent.css';

const IntroComponent = (props) => {

    const { title, icon } = props;

    return (
        <>
            <div className="container--intro">
                <div className="container--intro__title">
                    {title}
                </div>
                <div className="container--intro__logo">
                    <img src={icon} alt={icon}/>
                </div>
                <div className="container--intro__content">
                    {title === "Môi trường"? 
                     
                       <><span>Lumi</span><span>Home</span> hân hạnh được hỗ trợ cung cấp thông tin <span>“Nhiệt độ - Độ ẩm - Ánh sáng”</span> trong nhà của bạn!</> :
                        <><span>Lumi</span><span>Home</span> hân hạnh được hỗ trợ điều khiển các thiết bị <span>“{title}”</span> trong hệ thống nhà của bạn!</>
                    }
                </div>
            </div>
        </>
    );
}

export default IntroComponent;