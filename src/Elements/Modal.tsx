import { FiMapPin, FiX } from "react-icons/fi";
import { FullUser } from "../Data/Type";
import React, { useState } from "react";
import "./Modal.scss";
import { WeatherIcon } from "./WeatherIcon";

interface UserModalProps {
  user: FullUser;
  onClose: () => void;
}

export const Modal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(0);

  if (!user || !user.weather) return null;

  // Групуємо дані по днях
  const groupedByDay: Record< string, { times: Date[]; temperatures: number[]; weatherCodes: number[] }> = {};

  user.weather.hourlyTime.forEach((time, index) => {
    const dateStr = new Date(time).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });
    if (!groupedByDay[dateStr]) {
      groupedByDay[dateStr] = { times: [], temperatures: [], weatherCodes: [] };
    }
    groupedByDay[dateStr].times.push(new Date(time));
    if (user.weather) {
      groupedByDay[dateStr].temperatures.push(
        user.weather.hourlyTemperature[index]
      );
      groupedByDay[dateStr].weatherCodes.push(
        user.weather.hourlyWeatherCode[index]
      );
    }
  });


  // Функція для обчислення середньої температури та середнього коду погоди
  const getMinMaxTemperature = (temperatures: number[]) => {
    if (!temperatures.length) return "N/A";
    
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    
    return `${minTemp.toFixed(0)} / ${maxTemp.toFixed(0)}`;
  };
  const getMostFrequent = (arr: number[]) =>
    arr
      .filter(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop() || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>

        <div className="modalData">
          <picture className="photo">
            {user.user && "photo" in user.user && user.user.photo ? (
              <img src={user.user.photo} alt="User Photo" />
            ) : (
              <FiMapPin />
            )}
          </picture>
          <strong className="name">
            <div>
            {user.user?.title}{" "}
            {user.user && "first" in user.user
              ? user.user.first + " " + user.user.last
              : null}
            </div>
            {user.user && 'city' in user.user?(
              <div className="city">
                {user.user.city}
              </div>
            ):null}
          </strong>
          <div className="weatherIcon">
            {user.weather.curentTemperature.toFixed(1)}
            <WeatherIcon weatherCode={user.weather.currentWeatherCode} />
          </div>
        </div>

        <div className="modal-full-weather">
        {/* Вибір дня */}
        <div className="date-selector">
          <div className="date-btn hide"/>
          {Object.keys(groupedByDay).map((date, index) => {
            const avgWeatherCode = getMostFrequent(
              groupedByDay[date].weatherCodes
            );

            return (
              <button
                key={index}
                className={`date-btn ${selectedDay === index ? "active" : ""}`}
                onClick={() => setSelectedDay(index)}
              >
                <div className="weatherIcon">
                  <WeatherIcon weatherCode={avgWeatherCode} />
                </div>
                <div>{getMinMaxTemperature(groupedByDay[date].temperatures)}°C</div>
                <div>{date}</div>

              </button>
            );
          })}
          <div className="date-btn hide"/>
        </div>


        {/* Погода за вибраний день */}
        <div className="modalWeather">
          {selectedDay !== null &&
            groupedByDay[Object.keys(groupedByDay)[selectedDay]].times.map(
              (time, index) => {
                const hour = time.getHours();
                const temperature =
                  groupedByDay[
                    Object.keys(groupedByDay)[selectedDay]
                  ].temperatures[index].toFixed(1);
                const weatherCode =
                  groupedByDay[Object.keys(groupedByDay)[selectedDay]]
                    .weatherCodes[index];

                return (
                  <div key={index} className="modalHourWeather">
                    <div className="weatherIcon">
                      <WeatherIcon weatherCode={weatherCode} />
                    </div>
                    <div className="temperature">{temperature}°C</div>
                    <h3 className="hour">{`${hour}:00`}</h3>
                  </div>
                );
              }
            )}
        </div>
      </div>
      </div>
    </div>
  );
};
