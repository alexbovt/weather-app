import React, { useState } from "react";
import {
  Weather as WeatherObject,
  WeatherStateShape
} from "../../reducers/WeatherReducer";

import { connect } from "react-redux";

import "./Weather.css";
import { getWeatherByGeo } from "../../actions/Actions";

interface WeatherProps {
  weather?: WeatherObject;
  pending: boolean;
  city: string;
  onGetLocation: (lat: number, lon: number) => void;
}

type ScaleType = "celsius" | "fahrenheit";

const Weather: React.SFC<WeatherProps> = ({
  pending,
  weather,
  city,
  onGetLocation
}) => {
  const [scale, setScale] = useState<ScaleType>("celsius");

  const kelvinToCelsius = (temp: number): number => Math.floor(temp - 273.15);
  const kelvinToFahrenheit = (temp: number): number =>
    Math.floor((kelvinToCelsius(temp) * 9) / 5 + 32);

  const switchToCelsius = (e: React.MouseEvent) => setScale("celsius");
  const switchToFahrenheit = (e: React.MouseEvent) => setScale("fahrenheit");

  const handleGetLocation = (e: React.MouseEvent) => {
    navigator.geolocation.getCurrentPosition(
      geo => {
        if (geo && geo.coords) {
          onGetLocation &&
            onGetLocation(geo.coords.latitude, geo.coords.longitude);
        }
      },
      ({ message }) => console.log(message)
    );
  };

  return (
    <>
      <hr className={"weather-component-line"} />
      {pending ? (
        <span> Loading weather... </span>
      ) : weather && weather.main ? (
        <div className={"weather-component__content"}>
          <span>{city}</span>
          {weather.main.temp &&
            (scale === "celsius"
              ? `${kelvinToCelsius(weather.main.temp)}`
              : `${kelvinToFahrenheit(weather.main.temp)}`)}
          <div>
            <span
              style={{ color: scale === "celsius" ? "red" : "black" }}
              className={"weather-component__content-scale-btn"}
              onClick={switchToCelsius}
            >
              C
            </span>
            <span
              style={{ color: scale === "fahrenheit" ? "red" : "black" }}
              className={"weather-component__content-scale-btn"}
              onClick={switchToFahrenheit}
            >
              F
            </span>
          </div>
          <div>
            <span>
              {weather.weather && weather.weather.main && weather.weather.main}
            </span>
            {weather.weather && weather.weather.icon && (
              <div
                style={{
                  backgroundImage: `url(http://openweathermap.org/img/wn/${
                    weather.weather.icon
                  }.png)`,
                  height: "60px",
                  width: "60px",
                  backgroundSize: "cover"
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={"weather-component__default-message"}>
          <span> Please select a city or use automatic geolocation </span>
          <span
            style={{ color: "lightblue", cursor: "pointer" }}
            onClick={handleGetLocation}
          >
            Detect my geolocation
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ weather, pending, city }: WeatherStateShape) => ({
  weather,
  pending,
  city
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetLocation: (latitude: number, longitude: number) =>
    dispatch(getWeatherByGeo(latitude, longitude))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);
