import { Dispatch } from "redux";
import {
  LocationSuccessPayload,
  LocationErrorPayload,
  WeatherSuccessPayload,
  WeatherErrorPayload
} from "./ActionPayloads";
import {
  getLocationByLatLanFromGoogleMapsMock,
  getLocationByCityFromGoogleMapsMock
} from "../services/GoogleMapsAPIService";
import { Weather } from "../reducers/WeatherReducer";
import { getWeatherFromApiMock } from "../services/WeatherAPIService";

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

const getLocationSuccess = (location: string): LocationSuccessPayload => ({
  type: "GETTING_LOCATION_SUCCESS",
  location
});

const getLocationError = (error: string): LocationErrorPayload => ({
  type: "GETTING_LOCATION_ERROR",
  error
});

const getWeatherSuccess = (weather: Weather): WeatherSuccessPayload => ({
  type: "GETTING_WEATHER_SUCCESS",
  weather
});

const getWeatherError = (error: string): WeatherErrorPayload => ({
  type: "GETTING_WEATHER_ERROR",
  error
});

export const getWeather = (location: string) => async (dispatch: Dispatch) => {
  dispatch(getPending());
  try {
    const response = await getWeatherFromApiMock(location);
    dispatch(getWeatherSuccess(response));
  } catch (error) {
    dispatch(getWeatherError(error));
  }
};

export const getLocation = (data: LocationByCity | LocationByGeo) => async (
  dispatch: Dispatch<any>
) => {
  dispatch(getPending());
  try {
    const response = (data as LocationByCity).city
      ? await getLocationByCityFromGoogleMapsMock((data as LocationByCity).city)
      : await getLocationByLatLanFromGoogleMapsMock(
          (data as LocationByGeo).latitude,
          (data as LocationByGeo).longitude
        );
    const location = await response.location;
    dispatch(getLocationSuccess(location));
    dispatch(getWeather(location));
  } catch (error) {
    dispatch(getLocationError(error));
  }
};
