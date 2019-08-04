import axios, { AxiosResponse } from "axios";

const API_URL = "api.openweathermap.org/data/2.5/weather";
const API_KEY = "97b5ed122c2b0f589a4e790c560bb9c3";

export const getWeatherByCityName = async (
  city: string
): Promise<AxiosResponse<any>> => {
  return axios.get(`https://${API_URL}?q=${city}&&appid=${API_KEY}`);
};

export const getWeatherByGeolocation = async (
  lat: number,
  lon: number
): Promise<AxiosResponse<any>> => {
  return await axios.get(
    `https://${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
};
