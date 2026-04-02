<script setup>
defineProps({
  task: Object,
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="bg-white/10 p-3 rounded-lg border border-white/10 hover:bg-white/20 transition cursor-grab w-full overflow-hidden">

    <!-- TOP -->
    <div class="flex justify-between items-start">
      <h3 class="text-sm font-semibold">
        {{ task.title }}
      </h3>

      <div class="flex gap-2">
        <button
          @click="$emit('edit', task)"
          class="text-blue-400 hover:text-blue-300 text-sm"
        >
          ✏️
        </button>

        <button
          @click="$emit('delete', task._id)"
          class="text-red-400 hover:text-red-300 text-sm"
        >
          🗑
        </button>
      </div>
    </div>

    <!-- DESCRIPTION -->
    <p class="text-xs text-gray-400 mt-1">
      {{ task.description }}
    </p>
  </div>
</template>