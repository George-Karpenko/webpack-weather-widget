<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import IconArrowReturnLeft from "./icons/IconArrowReturnLeft.vue";

const props = defineProps<{
  title: string;
  placeholder: string;
  ariaLabel: string;
  ariaDescribedby: string;
  validations: { text: string; cb: (name: string) => boolean }[];
}>();
const emit = defineEmits<{
  (e: "addItem", value: string): void;
}>();

const item = ref("");
const errors: Ref<string[]> = ref([]);
function addItem() {
  errors.value = [];
  props.validations.forEach((validation) => {
    if (validation.cb(item.value) && validation.text) {
      errors.value.push(validation.text);
    }
  });

  if (errors.value.length) {
    return;
  }
  emit("addItem", item.value);
  item.value = "";
}
</script>

<template>
  <h5 class="card-title was-validated">{{ title }}</h5>
  <div class="input-group has-validation">
    <input
      v-model="item"
      @keyup.enter="addItem"
      :class="{ 'is-invalid': errors.length }"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      :aria-describedby="ariaDescribedby"
      type="text"
      class="form-control"
    />
    <span @click="addItem" class="input-group-text" :id="ariaDescribedby">
      <icon-arrow-return-left />
    </span>
    <div class="invalid-feedback">
      <template v-for="error in errors" :key="error">
        <p v-if="error">{{ error }}</p>
      </template>
    </div>
  </div>
</template>
