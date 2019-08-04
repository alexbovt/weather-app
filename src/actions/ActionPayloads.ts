import { Action } from "redux";
import { Weather } from "../reducers/WeatherReducer";

export type ActionTypes =
  | "GETTING_PENDING"
  | "GETTING_WEATHER_SUCCESS"
  | "GETTING_WEATHER_ERROR"
  | "GETTING_CITY_SUCCESS"
  | "GETTING_CITY_ERROR";

export type SimpleAction = Action<ActionTypes>;

export interface WeatherSuccessPayload extends SimpleAction {
  weather: Weather;
}
export interface WeatherErrorPayload extends SimpleAction {
  error: string;
}
export interface CitySuccessPayload extends SimpleAction {
  city: string;
}
export interface CityErrorPayload extends SimpleAction {
  error: string;
}
