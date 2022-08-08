<script setup lang="ts">
import { Ref, ref } from "vue";
import IconHamburgr from "./icons/IconHamburgr.vue";
import IconTrashFill from "./icons/IconTrashFill.vue";

const props = defineProps<{
  items: any[];
  objectKey: string;
}>();
const emit = defineEmits<{
  (e: "dragable", value: any): void;
  (e: "remove", value: number): void;
}>();

const list: Ref<any[]> = ref(props.items);
let dragStartItem: any;
let isHandle = false;

function onDragStart(event: DragEvent, item: any) {
  if (!isHandle) {
    event.preventDefault();
    return;
  }
  event.dataTransfer!.dropEffect = "move";
  event.dataTransfer!.effectAllowed = "move";
  isHandle = false;
  dragStartItem = item;
}
function onDragOver(event: DragEvent, dragOverItem: any) {
  if (dragStartItem === dragOverItem) return;
  for (let index = 0; index < list.value.length; index++) {
    const item = list.value[index];
    if (item === dragOverItem) {
      list.value[index] = dragStartItem;
      continue;
    }
    if (item === dragStartItem) {
      list.value[index] = dragOverItem;
      continue;
    }
  }
  emit("dragable", list.value);
}
function handle() {
  isHandle = true;
}

function remove(index: number) {
  emit("remove", index);
}
</script>

<template>
  <ul
    @dragover.prevent
    @dragenter.prevent
    class="list-group list-group-flush"
  >
    <li
      v-for="(item, index) in list"
      :key="item[objectKey]"
      @dragstart="onDragStart($event, item)"
      @dragover="onDragOver($event, item)"
      draggable="true"
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <div class="align-items-center">
        <icon-hamburgr
          @mousedown="handle"
          class="cursor-move"
        ></icon-hamburgr>
        <slot :item="item">
          {{ item[objectKey] }}
        </slot>
      </div>
      <icon-trash-fill @click="remove(index)"></icon-trash-fill>
    </li>
  </ul>
</template>

