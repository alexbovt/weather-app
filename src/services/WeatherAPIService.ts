import { Weather } from "../reducers/WeatherReducer";

export const getWeatherFromApiMock = async (
  location: string
): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ temp: 22 } as Weather), 3000);
  });
};
