<script setup lang="ts">
import { computed } from "vue";
import { City } from "../@types";

const props = defineProps<{
  city: City;
}>();

const location = computed(() => {
  if (props.city.api) {
    return `${props.city.api.name}, ${props.city.api.sys.country}`;
  }
  return props.city.location;
});
</script>

<template>
  {{ location }}
</template>
