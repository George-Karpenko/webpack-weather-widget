import { onMounted, ref, watch } from "vue";
import { City } from "../@types";
import { cbApi } from "../@interface";
import {
  getCityByGeolocation,
  subscribeToWeather,
  unsubscribeFromWeather,
} from "../api";
import type { Ref } from "vue";

export default function useCities(cb: () => void) {
  const cities: Ref<City[]> = ref([]);
  onMounted(async () => {
    const citiesData = localStorage.getItem("locations");
    if (citiesData) {
      JSON.parse(citiesData).forEach((city: string) => {
        cities.value.push({ location: city });
      });
    }
    if (!localStorage.getItem("site-was-opened")) {
      const city = await getCityByGeolocation();
      if (city) {
        cities.value.push({ location: city });
      }
    }
    if (cities.value) {
      cities.value.forEach((city) => {
        subscribeToWeather(city.location, updateWeather);
      });
    }
    cb();
    localStorage.setItem("site-was-opened", "yes");
  });

  watch(
    () => cities.value,
    (cities) => {
      const locations = cities.map((city) => city.location);
      localStorage.setItem("locations", JSON.stringify(locations));
    },
    { deep: true }
  );

  function updateWeather({ locationName, weather, error }: cbApi) {
    const indexCity = cities.value.findIndex(
      (city) => city.location.toUpperCase() === locationName
    );
    if (weather) {
      cities.value[indexCity].api = weather;
      return;
    }
    cities.value[indexCity].apiError = error;
  }

  function addCity(value: string) {
    cities.value.push({ location: value });
    subscribeToWeather(value, updateWeather);
  }
  function updateCities(list: City[]) {
    cities.value = list;
  }
  function removeCity(index: number) {
    const location = cities.value[index].location;
    unsubscribeFromWeather(location, updateWeather);
    cities.value.splice(index, 1);
  }

  return {
    cities,
    addCity,
    updateCities,
    removeCity,
  };
}
