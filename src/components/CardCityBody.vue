<script setup lang="ts">
import WindSpeedNewData from "../lang/en/wind-speed-new-data.json";
import dictionary from "../lang/en/dictionary.json";
import metric from "../lang/en/measurement-system/metric.json";
import type { ApiCity } from "../@types";
import { computed } from "vue";

const props = defineProps<{
  city: ApiCity;
}>();

const weatherDescription = computed(() => {
  let windPower;
  for (var key in WindSpeedNewData) {
    if (
      WindSpeedNewData[key as keyof typeof WindSpeedNewData].speed_interval[0] <
        props.city.wind.speed &&
      WindSpeedNewData[key as keyof typeof WindSpeedNewData].speed_interval[1] >
        props.city.wind.speed
    ) {
      windPower = key;
      break;
    }
  }
  return `${ dictionary.feels_like }
  ${Math.round(props.city.main.feels_like)}°C.
  ${props.city.weather[0].description}. ${windPower}`;
});

const temp = computed(() => Math.round(props.city.main.temp));
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div>
      <img
        :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
        :alt="city.weather[0].description"
      />
    </div>
    <p class="card-text fs-1">{{ temp }}{{ metric.degrees }}</p>
  </div>
  <p class="card-text">
    {{ weatherDescription }}
  </p>
</template>
