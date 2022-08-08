import { ApiCity, ApiError } from "../@types";

export interface cbApi {
  locationName: string;
  error?: ApiError;
  weather?: ApiCity;
}
