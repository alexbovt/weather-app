import {
  SimpleAction,
  gettingWeatherSuccessPayload,
  gettingWeatherErrorPayload
} from "../config/ActionPayloads";

interface WeatherStateShape {
  pending: boolean;
  weather: string;
  error: string;
}

const initialState: WeatherStateShape = {
  pending: false,
  weather: "",
  error: ""
};

export const weatherReducer = (
  state: WeatherStateShape = initialState,
  action: SimpleAction
) => {
  switch (action.type) {
    case "GETTING_WEATHER_PENDING": {
      return {
        ...state,
        pending: true
      };
    }
    case "GETTING_WEATHER_SUCCESS": {
      return {
        ...state,
        pending: false,
        weather: (action as gettingWeatherSuccessPayload).weather
      };
    }
    case "GETTING_WEATHER_ERROR": {
      return {
        ...state,
        pending: false,
        error: (action as gettingWeatherErrorPayload).error
      };
    }
    default:
      return state;
  }
};
