<script setup lang="ts">
import IconWindDirection from "./icons/IconWindDirection.vue";
import IconPressure from "./icons/IconPressure.vue";
import windDirectionShortData from "../lang/en/wind-direction-short-data.json";
import weather from "../lang/en/weather.json";
import metric from "../lang/en/measurement-system/metric.json";
import type { ApiCity } from "../@types";
import { computed, useCssModule } from "vue";

const props = defineProps<{
  city: ApiCity;
}>();

const windIconRotation = computed(() => {
  const INITIAL_POSITION_OF_ICON = 180;
  return props.city.wind.deg + INITIAL_POSITION_OF_ICON;
});

useCssModule("card_city_footer");

const wind = computed(() => {
  let windDirection;
  for (var key in windDirectionShortData) {
    if (
      windDirectionShortData[key as keyof typeof windDirectionShortData]
        .deg_interval[0] < props.city.wind.speed &&
      windDirectionShortData[key as keyof typeof windDirectionShortData]
        .deg_interval[1] > props.city.wind.speed
    ) {
      windDirection = key;
      break;
    }
  }

  return `${props.city.wind.speed}${metric.speed} ${windDirection}`;
});

const visibility = computed(() => {
  const kilometerInMeters = 1000;
  return `${(props.city.visibility / kilometerInMeters).toFixed(1)}
    ${metric.distance}`;
});
</script>

<template>
  <div :class="card_city_footer.grid">
    <div>
      <icon-wind-direction
        style="height: 1rem"
        :style="`transform: rotate(${windIconRotation}deg);`"
      />
      {{ wind }}
    </div>
    <div>
      <icon-pressure style="height: 1rem" />
      {{ city.main.pressure }}
      {{ metric.pressure }}
    </div>
    <div>
      {{ weather.humidity }}: {{ city.main.humidity }} {{ metric.percentages }}
    </div>
    <div>
      {{ weather.dew_point }}: {{ city.dew_point }} {{ metric.degrees }}
    </div>
    <div>{{ weather.visibility }}: {{ visibility }}</div>
  </div>
</template>

<style module="card_city_footer">
.grid {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
</style>
