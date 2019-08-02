import { Action } from "redux";
import { Weather } from "../reducers/WeatherReducer";

export type ActionTypes =
  | "GETTING_PENDING"
  | "GETTING_WEATHER_SUCCESS"
  | "GETTING_WEATHER_ERROR"
  | "GETTING_LOCATION_SUCCESS"
  | "GETTING_LOCATION_ERROR";

export type SimpleAction = Action<ActionTypes>;

export interface WeatherSuccessPayload extends SimpleAction {
  weather: Weather;
}
export interface WeatherErrorPayload extends SimpleAction {
  error: string;
}
export interface LocationSuccessPayload extends SimpleAction {
  location: string;
}
export interface LocationErrorPayload extends SimpleAction {
  error: string;
}
