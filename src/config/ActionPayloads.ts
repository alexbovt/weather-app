import { Action } from "redux";

export type ActionTypes =
  | "GETTING_WEATHER_PENDING"
  | "GETTING_WEATHER_SUCCESS"
  | "GETTING_WEATHER_ERROR";

export type SimpleAction = Action<ActionTypes>;

export interface gettingWeatherPendingPayload extends SimpleAction {
  city: string;
}
export interface gettingWeatherSuccessPayload extends SimpleAction {
  weather: string;
}
export interface gettingWeatherErrorPayload extends SimpleAction {
  error: string;
}
