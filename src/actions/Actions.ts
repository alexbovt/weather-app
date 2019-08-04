import { Dispatch } from "redux";
import {
  WeatherSuccessPayload,
  WeatherErrorPayload,
  CitySuccessPayload,
  CityErrorPayload
} from "./ActionPayloads";
import {
  getWeatherByCityName,
  getWeatherByGeolocation
} from "./../services/WeatherAPIService";
import { Weather } from "../reducers/WeatherReducer";

export type LocationByCity = {
  city: string;
};

export interface LocationByGeo {
  latitude: number;
  longitude: number;
}

const getPending = () => ({
  type: "GETTING_PENDING"
});

const getWeatherSuccess = (weather: Weather): WeatherSuccessPayload => ({
  type: "GETTING_WEATHER_SUCCESS",
  weather
});

const getWeatherError = (error: string): WeatherErrorPayload => ({
  type: "GETTING_WEATHER_ERROR",
  error
});

const getCitySuccess = (city: string): CitySuccessPayload => ({
  type: "GETTING_CITY_SUCCESS",
  city
});

const getCityError = (error: string): CityErrorPayload => ({
  type: "GETTING_CITY_ERROR",
  error
});

export const getWeatherByCity = (city: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getPending());
  try {
    const response = await getWeatherByCityName(city);
    if (response.data) {
      const {
        name,
        sys: { country, sunrise, sunset },
        main: { temp, pressure, temp_max, temp_min, humidity },
        wind: { speed, deg },
        visibility,
        timezone,
        weather: { main, icon }
      } = await response.data;

      const weather = {
        sys: { country, sunrise, sunset },
        main: { temp, pressure, temp_max, temp_min, humidity },
        wind: { speed, deg },
        visibility,
        timezone,
        weather: { main, icon }
      } as Weather;
      dispatch(getCitySuccess(`${name}, ${country}`));
      dispatch(getWeatherSuccess(weather));
    } else {
      throw new Error("Something was wrong");
    }
  } catch (error) {
    dispatch(getWeatherError(error));
  }
};

export const getWeatherByGeo = (lat: number, lan: number) => async (
  dispatch: Dispatch
) => {
  dispatch(getPending());
  try {
    const response = await getWeatherByGeolocation(lat, lan);
    const {
      name,
      sys: { country, sunrise, sunset },
      main: { temp, pressure, temp_max, temp_min, humidity },
      wind: { speed, deg },
      visibility,
      timezone,
      weather: { main, icon }
    } = await response.data;

    const weather = {
      sys: { country, sunrise, sunset },
      main: { temp, pressure, temp_max, temp_min, humidity },
      wind: { speed, deg },
      visibility,
      timezone,
      weather: { main, icon }
    } as Weather;
    dispatch(getCitySuccess(`${name}, ${country}`));
    dispatch(getWeatherSuccess(weather));
  } catch (error) {
    dispatch(getWeatherError(error));
  }
};
