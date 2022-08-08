<script setup lang="ts">
import dictionary from "../lang/en/dictionary.json";
</script>

<template>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">{{ dictionary.loading }}...</span>
  </div>
</template>
