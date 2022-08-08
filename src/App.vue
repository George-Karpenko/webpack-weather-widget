<!-- 
    TODO
  - 1) Валидация по стране
  - 2) Валидация, если разбивается строка на 3 и более
  - 3) Сделать модель City
  - 4) symbol для DraggaleHandle
  - 5) Компиляция css файлов в js
  * 6) Придумать более лучшую реализацию удаления cb
    7) минифицировать js
  - 8) создать json с локализацией
  - 9) исправить стили (опять использовать bootstrap, и иногда компоновать классы)
  - 10) проверять и на местоположение тоже, даже если город уже есть
  - 11) Типизация, использование Draggable 
  * 12) v-model в app.vue
  - 13) ApiError

    14) Компоненты, который надо доработать:
  -   --App.vue
  -   --WeatherInCities.vue (Нужно сделать переключатель)
  -   --TheSettings.vue (Вынести логику отдельных кусков кода и сделать компонент DraggableHandleCity.vue)
  -   --CardCity.vue
            -->

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
  <main>
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
        :class="app.close"
        class="position-absolute"
      />
    </template>
  </main>
</template>

<style module="app">
.close {
  top: 12px;
  right: 16px;
}
</style>
