import {
  SimpleAction,
  WeatherSuccessPayload,
  WeatherErrorPayload,
  CitySuccessPayload,
  CityErrorPayload
} from "../actions/ActionPayloads";
import { template } from "@babel/core";

export interface WeatherStateShape {
  city: string;
  pending: boolean;
  weather?: Weather;
  error: string;
}

export interface Weather {
  sys?: { country?: string; sunrise?: number; sunset?: number };
  main?: {
    humidity?: number;
    pressure?: number;
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  wind?: { speed?: number; deg?: 230 };
  visibility?: number;
  timezone?: number;
  weather?: { main?: string; icon?: string };
}

const initialState: WeatherStateShape = {
  city: "",
  pending: false,
  weather: {},
  error: ""
};

export const WeatherReducer = (
  state: WeatherStateShape = initialState,
  action: SimpleAction
) => {
  switch (action.type) {
    case "GETTING_PENDING": {
      return {
        ...state,
        pending: true
      };
    }
    case "GETTING_CITY_SUCCESS": {
      return {
        ...state,
        city: (action as CitySuccessPayload).city
      };
    }
    case "GETTING_CITY_ERROR": {
      return {
        ...state,
        error: (action as CityErrorPayload).error
      };
    }
    case "GETTING_WEATHER_SUCCESS": {
      return {
        ...state,
        pending: false,
        weather: (action as WeatherSuccessPayload).weather
      };
    }
    case "GETTING_WEATHER_ERROR": {
      return {
        ...state,
        pending: false,
        error: (action as WeatherErrorPayload).error
      };
    }
    default:
      return state;
  }
};
