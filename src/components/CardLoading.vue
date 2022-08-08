<script setup lang="ts">
import TheLoading from "./TheLoading.vue";
import CardComponent from "./CardComponent.vue";

defineProps<{
  title: string;
}>();
</script>

<template>
  <card-component>
    <template #header>
      <span> {{ title }}</span>
    </template>
    <template #body>
      <div class="p-5 d-flex justify-content-center align-items-center">
        <the-loading />
      </div>
    </template>
  </card-component>
</template>
