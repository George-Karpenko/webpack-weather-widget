import { cbApi } from "./@interface";
import { getPositionPromised } from "./geolocation";
const API_KEY = "44339eb4d08033a68b3706145f9c869e";

const citiesHandlers = new Map();

const loadWeatherByCity = () => {
  if (citiesHandlers.size === 0) {
    return;
  }
  const cities = [...citiesHandlers.keys()];
  cities.forEach(async (city) => {
    const handers = citiesHandlers.get(city) ?? [];
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      handers.forEach((fn: (data: cbApi) => void) =>
        fn({ locationName: city, error: data })
      );
      return;
    }
    let dew_point: number;
    handers.forEach((fn: (data: cbApi) => void) =>
      fn({ locationName: city, weather: { ...data, dew_point } })
    );
  });
};

const loadWeatherByCoords = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await response.json();
  return data.name;
};

export const subscribeToWeather = (
  city: string,
  cb: (data: cbApi) => void
) => {
  city = city.toUpperCase();
  const subscribers = citiesHandlers.get(city) || [];
  citiesHandlers.set(city, [...subscribers, cb]);
};

export const unsubscribeFromWeather = (
  city: string,
  cb: (data: cbApi) => void
) => {
  city = city.toUpperCase();
  let subscribers = citiesHandlers.get(city) || [];
  subscribers = subscribers.filter(
    (
      callback: (data: cbApi) => void
    ) => callback != cb
  );
  if (!subscribers.length) {
    citiesHandlers.delete(city);
    return;
  }
  citiesHandlers.set(city, subscribers);
};

export const getCityByGeolocation = async () => {
  let lat;
  let lng;
  await getPositionPromised()
    .then((position: GeolocationPosition) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    })
    .catch(() => {
      /*something went wrong*/
    });
  if (lat && lng) {
    return loadWeatherByCoords(lat, lng);
  }
};

setInterval(loadWeatherByCity, 5000);
