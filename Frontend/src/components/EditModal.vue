<script setup>
defineProps({
  show: Boolean,
  task: Object,
});

const emit = defineEmits(["close", "update"]);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  >
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl w-full max-w-md">

      <h2 class="text-xl font-bold mb-4 text-white">Edit Task</h2>

      <input
        v-model="task.title"
        class="w-full mb-3 px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
        placeholder="Title"
      />

      <textarea
        v-model="task.description"
        class="w-full mb-4 px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
        placeholder="Description"
      ></textarea>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          @click="$emit('update', task)"
          class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>