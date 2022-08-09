<script setup lang="ts">
import cardLoading from "./cardLoading.vue";
import cardError from "./cardError.vue";
import CardCity from "./CardCity.vue";
import type { City } from "../@types";

defineProps<{
  city: City;
}>();
</script>

<template>
  <card-city v-if="city.api" :city="city.api" />
  <card-error
    v-else-if="city.apiError"
    :title="city.location"
    :code="+city.apiError.cod"
    :message="city.apiError.message"
  />
  <card-loading v-else="!city.api && !city.apiError" :title="city.location" />
</template>
