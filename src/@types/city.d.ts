export type City = {
  location: string;
  api?: ApiCity;
  apiError?: ApiError;
};

export type ApiError = {
  cod: string;
  message: string;
};

export type ApiCity = {
  name: string;
  cod: number;
  visibility: number;
  wind: {
    deg: number;
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  sys: {
    country: string;
  };
  main: {
    feels_like: number;
    pressure: number;
    temp: number;
    humidity: number;
  };
  dew_point: number;
};
