import { combineReducers } from "redux";
import { weatherReducer } from "./WeatherReducer";

const rootReducer = combineReducers({
  weather: weatherReducer
});

export default rootReducer;
