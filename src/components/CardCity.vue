<script setup lang="ts">
import CardCityBody from "./CardCityBody.vue";
import CardCityFooter from "./CardCityFooter.vue";
import type { ApiCity } from "../@types";
import CardComponent from "./CardComponent.vue";

defineProps<{
  city: ApiCity;
}>();
</script>

<template>
  <card-component>
    <template #header>
      <span>{{ city.name }}, {{ city.sys.country }}</span>
    </template>
    <template #body>
      <card-city-body :city="city" />
    </template>
    <template #footer>
      <card-city-footer :city="city" />
    </template>
  </card-component>
</template>
