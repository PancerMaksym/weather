import { FiMapPin } from "react-icons/fi";
import { WeatherIcon } from "./WeatherIcon";
import './Loading.scss'


export function Loading() {
  return (
    <>
      <div className="userDiv">
        <div className="userData">
          <picture>
            <div className="photo loader">
              <FiMapPin className="point loader" />
            </div>
          </picture>

          <strong className="lName loader" />

          <div className="lWeatherIcon loader">
            <WeatherIcon weatherCode={0} />
          </div>
        </div>

        <div className="userdiv">
          <div className="firstdiv loader" />
          <div className="seconddiv loader" />
        </div>
      </div>
    </>
  );
}
