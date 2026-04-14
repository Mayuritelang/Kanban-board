<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-5">

    <Header />

    <TaskForm @add="store.addTask" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[75vh]">
      <TaskColumn
        v-for="col in columns"
        :key="col.status"
        :title="col.title"
        :tasks="col.tasks"
        :status="col.status"
        @drop="handleDrop"
        @edit="openEdit"
        @delete="store.deleteTask"
      />
    </div>

    <EditModal
      :show="showEditModal"
      :task="editTaskData"
      @close="showEditModal = false"
      @update="updateTask"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useTaskStore } from "../stores/taskstore";

import Header from "../components/Header.vue";
import TaskForm from "../components/TaskForm.vue";
import TaskColumn from "../components/TaskColumn.vue";
import EditModal from "../components/EditModal.vue";

const store = useTaskStore();

const showEditModal = ref(false);
const editTaskData = ref({});

onMounted(store.fetchTasks);

const columns = computed(() => [
  { title: "To Do", tasks: store.todoTasks, status: "todo" },
  { title: "In Progress", tasks: store.progressTasks, status: "inprogress" },
  { title: "Done", tasks: store.doneTasks, status: "done" },
]);

const handleDrop = (event, status) => {
  if (event.added) {
    const task = event.added.element;
    store.updateTask(task._id, { status });
  }
};

const openEdit = (task) => {
  editTaskData.value = { ...task };
  showEditModal.value = true;
};

const updateTask = (task) => {
  store.updateTask(task._id, task);
  showEditModal.value = false;
};
</script>