<script setup lang="ts">
import { ref, useCssModule } from "vue";
import WeatherInCities from "./components/WeatherInCities.vue";
import TheSettings from "./components/TheSettings.vue";
import IconGear from "./components/icons/IconGear.vue";
import useCities from "./composables/useCities";

useCssModule("app");

const { cities, updateCities, addCity, removeCity } = useCities(() =>
  settingsVisible(false)
);

const isSettingsVisible = ref(false);

function settingsVisible(value: boolean) {
  if (!cities.value.length) {
    isSettingsVisible.value = true;
    return;
  }
  isSettingsVisible.value = value;
}
</script>

<template>
  <main class="position-relative">
    <the-settings
      v-if="isSettingsVisible"
      @visible="settingsVisible"
      @addCity="addCity"
      @updateCities="updateCities"
      @removeCity="removeCity"
      :cities="cities"
    />
    <template v-else>
      <weather-in-cities :cities="cities" />
      <icon-gear
        @click="settingsVisible(true)"
        :class="app.icon_gear"
        class="position-absolute"
      />
    </template>
  </main>
</template>

<style module="app">
.icon_gear {
  top: 9px;
  right: 16px;
}
</style>
