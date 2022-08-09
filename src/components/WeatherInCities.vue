<script setup lang="ts">
import type { City } from "../@types";
import WeatherInCity from "./WeatherInCity.vue";

defineProps<{
  cities: City[];
}>();

</script>

<template>
  <weather-in-city
    v-for="(city, index) in cities"
    :key="index"
    :city="city"
  />
</template>

