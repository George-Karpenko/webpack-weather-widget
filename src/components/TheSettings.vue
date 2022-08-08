<script setup lang="ts">
import AddItem from "./AddItem.vue";
import DraggableHandle from "./DraggableHandle.vue";
import DraggableHandleCity from "./DraggableHandleCity.vue";
import type { City } from "../@types";
import IconX from "./icons/IconX.vue";
import CardComponent from "./CardComponent.vue";
import ValidationsAddCity from "../composables/validationsAddCity";
import dictionary from "../lang/en/dictionary.json";

const props = defineProps<{
  cities: City[];
}>();

const emit = defineEmits<{
  (e: "visible", value: boolean): void;
  (e: "addCity", value: string): void;
  (e: "removeCity", value: number): void;
  (e: "updateCities", value: City[]): void;
}>();

const validationsAddCity = ValidationsAddCity(props.cities)

function close() {
  emit("visible", false);
}
function addCity(value: string) {
  emit("addCity", value);
}
function removeCity(value: number) {
  emit("removeCity", value);
}
function updateCities(value: City[]) {
  emit("updateCities", value);
}
</script>

<template>
  <card-component>
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span>{{ dictionary.settings }}</span><icon-x @click="close"></icon-x>
      </div>
    </template>
    <template #list>
      <draggable-handle
        @remove="removeCity"
        @dragable="updateCities"
        :items="cities"
        objectKey="location"
      >
        <template #default="{ item }: { item: City }">
          <draggable-handle-city :city="item" />
        </template>
      </draggable-handle>
    </template>
    <template #body>
      <add-item
        @addItem="addCity"
        :validations="validationsAddCity"
        :title="`${dictionary.add} ${dictionary.location}`"
        :placeholder="dictionary.location"
        :ariaLabel="dictionary.location"
        :ariaDescribedby="dictionary.add_location"
      />
    </template>
  </card-component>
</template>
