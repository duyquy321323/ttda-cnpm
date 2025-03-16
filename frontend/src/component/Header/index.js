import axios from "axios";
import { useEffect, useState } from "react";
import { CiCircleInfo, CiCloud, CiGlobe } from "react-icons/ci";
import "./Header.css";

const Header = () => {

    const [temperature, setTemperature] = useState(null);
  
  const API_KEY = "d23679977faf0745acedc09ae6801f5c";
  const CITY = "Di An,VN";
  const URL_LON_LAT = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&appid=${API_KEY}`;

  useEffect(() => {
    async function getLonLat() {
      try {
        const response = await axios.get(URL_LON_LAT);
        const data =  response.data;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data[Array.from(data).length - 1].lat}&lon=${data[Array.from(data).length - 1].lon}&appid=${API_KEY}`)
      .then(response => {
        setTemperature(Math.round(response.data.main.temp - 273.15));
      })
      .catch(error => {
        console.error(error);
      });
      } catch (error) {
        console.error(error);
      }
    }
    getLonLat();
    
  }, []);

    return (
        <>
            <section className="container--header">
                <div className="content">
                    <CiCloud size={48}/>
                    <p>{temperature}&nbsp;&deg;C</p>
                </div>
                <div className="container--header__right">
                    <div className="content">
                    <CiCircleInfo size={48}/>
                    <p>Giới thiệu</p>
                    </div>
                    <div className="content">
                    <CiGlobe size={48}/>
                    <p>Tiếng Việt</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Header;