export const getLocationByLatLanFromGoogleMapsMock = async (
  latitude: number,
  longitude: number
): Promise<{ location: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ location: "Krakow, Poland" }), 1500);
  });
};

export const getLocationByCityFromGoogleMapsMock = async (
  city: string
): Promise<{ location: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ location: city }), 1500);
  });
};
