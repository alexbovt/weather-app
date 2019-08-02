import {
  SimpleAction,
  WeatherSuccessPayload,
  WeatherErrorPayload,
  LocationSuccessPayload,
  LocationErrorPayload
} from "../config/ActionPayloads";

export interface WeatherStateShape {
  location: string;
  pending: boolean;
  weather: Weather;
  error: string;
}

export interface Weather {
  temp: number;
}

const initialState: WeatherStateShape = {
  location: "",
  pending: false,
  weather: { temp: 0 },
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
    case "GETTING_LOCATION_SUCCESS": {
      return {
        ...state,
        pending: false,
        location: (action as LocationSuccessPayload).location
      };
    }
    case "GETTING_LOCATION_ERROR": {
      return {
        ...state,
        pending: false,
        error: (action as LocationErrorPayload).error
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
