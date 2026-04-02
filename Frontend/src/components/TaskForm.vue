<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);

const title = ref("");
const description = ref("");

const submit = () => {
  if (!title.value) return;

  emit("add", {
    title: title.value,
    description: description.value,
    status: "todo",
  });

  title.value = "";
  description.value = "";
};
</script>

<template>
  <div class="flex justify-center mb-6">
    <div class="flex flex-col md:flex-row gap-3 w-full max-w-3xl bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg">

      <input
        v-model="title"
        placeholder="Task title..."
        class="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        v-model="description"
        placeholder="Description..."
        class="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        @click="submit"
        class="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition font-semibold"
      >
        + Add
      </button>
    </div>
  </div>
</template>