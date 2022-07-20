import React from "react";

const Weather = (props) => {
    return (
    <div className="weather_box">
        {props.city &&
            <div className="weather_container">
                <p className="p">Местоположение: {props.city}, {props.country}</p>
                <p className="p">Температура: {props.temp} &deg;C</p>
                <p className="p">Давление: {props.pressure} мм рт.ст.</p>
                <p className="p">Время восхода: {props.sunrise}</p>
                <p className="p">Время заката: {props.sunset}</p>
                <p className="p">Небо: {props.sky}</p>
            </div>
        }
            <p className="error">{props.error}</p>
    </div>
    );
}

export default Weather;
