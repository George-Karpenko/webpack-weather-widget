<script lang="ts" setup>
import { useSlots } from "vue";
const slots = useSlots();
</script>

<template>
  <div class="card">
    <template v-for="(slot, key) in slots" :key="key">
      <div v-if="key === 'header'" class="card-header">
        <slot name="header"></slot>
      </div>
      <slot v-if="key === 'list'" name="list"></slot>
      <div v-if="key === 'body'" class="card-body">
        <slot name="body"></slot>
      </div>
      <div v-if="key === 'footer'" class="card-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </div>
</template>
