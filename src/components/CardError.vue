<script setup lang="ts">
import CardComponent from "./CardComponent.vue";
import dictionary from "../lang/en/dictionary.json";

defineProps<{
  title: string;
  code: number;
  message: string;
}>();
</script>

<template>
  <card-component class="border-danger">
    <template #header>
      <span>{{ title }}</span>
    </template>
    <template #body>
      <h5 class="card-title">{{ dictionary.error }} {{ code }}</h5>
      <p class="card-text">{{ message }}</p>
    </template>
  </card-component>
</template>
