<script setup>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

const props = defineProps({
  title: String,
  tasks: Array,
  status: String,
});

const emit = defineEmits(["drop", "edit", "delete"]);

// dynamic color classes
const colorMap = {
  todo: "text-blue-400 border-blue-400/30",
  inprogress: "text-yellow-400 border-yellow-400/30",
  done: "text-green-400 border-green-400/30",
};
</script>

<template>
  <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col">

    <!-- HEADER -->
    <div :class="['flex flex-col mb-3 font-semibold', colorMap[status]]">
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">{{ title }}</span>
        <span class="bg-white/10 px-2 py-1 rounded text-xs">
          {{ tasks.length }}
        </span>
      </div>
      <div :class="['border-b mt-3', colorMap[status]]"></div>
    </div>

    <!-- DRAG AREA -->
    <draggable
    :list="tasks"
    group="tasks"
    item-key="_id"
    animation="200"
    ghost-class="ghost"
    chosen-class="chosen"
    drag-class="drag"
    class="flex-1 overflow-y-auto space-y-2 pr-1"
    @change="(e) => $emit('drop', e, status)">
      <template #item="{ element }">
        <TaskCard
          :task="element"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </template>
    </draggable>
  </div>
</template>