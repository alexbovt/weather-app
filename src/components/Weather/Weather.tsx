import React from "react";
import {
  Weather as WeatherObject,
  WeatherStateShape
} from "../../reducers/WeatherReducer";

import { connect } from "react-redux";

interface WeatherProps {
  weather: WeatherObject;
  pending: boolean;
  location: string;
}

const Weather: React.SFC<WeatherProps> = ({ pending, weather, location }) => {
  return pending ? (
    <span> Loading... </span>
  ) : (
    <span> {`${location.split(",")[0]} - ${weather.temp}`}</span>
  );
};

const mapStateToProps = ({
  weather,
  pending,
  location
}: WeatherStateShape) => ({
  weather,
  pending,
  location
});

export default connect(
  mapStateToProps,
  null
)(Weather);
