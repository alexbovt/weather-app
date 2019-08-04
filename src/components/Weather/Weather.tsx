import React, { useState } from "react";
import {
  Weather as WeatherObject,
  WeatherStateShape
} from "../../reducers/WeatherReducer";

import { connect } from "react-redux";

interface WeatherProps {
  weather?: WeatherObject;
  pending: boolean;
  city: string;
}

type ScaleType = "celsius" | "fahrenheit";

const Weather: React.SFC<WeatherProps> = ({ pending, weather, city }) => {
  const [scale, setScale] = useState<ScaleType>("celsius");

  const kelvinToCelsius = (temp: number): number => Math.floor(temp - 273.15);
  const kelvinToFahrenheit = (temp: number): number =>
    Math.floor((kelvinToCelsius(temp) * 9) / 5 + 32);

  return pending ? (
    <span> Loading... </span>
  ) : weather && weather.main ? (
    <div>
      <span>{city}</span>
      {weather.main.temp &&
        (scale === "celsius"
          ? `${kelvinToCelsius(weather.main.temp)}`
          : `${kelvinToFahrenheit(weather.main.temp)}`)}
      <span onClick={e => setScale("celsius")}>C</span>
      <span onClick={e => setScale("fahrenheit")}>F</span>
    </div>
  ) : (
    <> </>
  );
};

const mapStateToProps = ({ weather, pending, city }: WeatherStateShape) => ({
  weather,
  pending,
  city
});

export default connect(
  mapStateToProps,
  null
)(Weather);
