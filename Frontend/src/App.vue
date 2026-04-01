import draggable from "vuedraggable";

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-5">
    <!-- HEADER -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold tracking-wide">Kanban Board</h1>
      <p class="text-gray-400 mt-1">Drag & Drop Tasks 🚀</p>
    </div>

    <!-- ADD TASK FORM -->
    <div class="flex justify-center mb-6">
      <div
        class="flex flex-col md:flex-row gap-3 w-full max-w-3xl bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg">
        <!-- Title -->
        <input v-model="title" placeholder="Task title..."
          class="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <!-- Description -->
        <input v-model="description" placeholder="Description..."
          class="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <!-- Button -->
        <button @click="addTask"
          class="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition font-semibold">
          + Add
        </button>
      </div>
    </div>

    <!-- BOARD -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[75vh]">
      <!-- TODO -->
      <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col">
        <div class="flex flex-col mb-3 text-blue-400 font-semibold">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-blue-400">To Do</span>
            <span class="bg-white/10 px-2 py-1 rounded text-xs">{{ todoTasks.length }}</span>
          </div>
          <div class="border-b border-blue-400/30 mt-3"></div>
        </div>

        <draggable v-model="todoTasks" group="tasks" item-key="_id" class="flex-1 overflow-y-auto space-y-2 pr-1"
          @change="(e) => onDrop(e, 'todo')">
          <template #item="{ element }">
            <div
              class="bg-white/10 p-3 rounded-lg border border-white/10 hover:bg-white/20 transition cursor-grab w-full overflow-hidden">
              <!-- TOP -->
              <div class="flex justify-between items-start">
                <h3 class="text-sm font-semibold">
                  {{ element.title }}
                </h3>
                <!-- ACTION BUTTONS -->
                <div class="flex gap-2">
                  <button @click.stop="editTask(element)" class="text-blue-400 hover:text-blue-300 text-sm">
                    ✏️
                  </button>
                  <button @click.stop="deleteTask(element._id)" class="text-red-400 hover:text-red-300 text-sm">
                    🗑
                  </button>
                </div>
              </div>

              <!-- DESCRIPTION -->
              <p class="text-xs text-gray-400 mt-1">
                {{ element.description }}
              </p>
            </div>
          </template>
        </draggable>
      </div>

      <!-- IN PROGRESS -->
      <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col">
        <div class="flex flex-col mb-3 text-yellow-400 font-semibold">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-yellow-400">In Progress</span>
            <span class="bg-white/10 px-2 py-1 rounded text-xs">{{ progressTasks.length }}</span>
          </div>
          <div class="border-b border-yellow-400/30 mt-3"></div>
        </div>

        <draggable v-model="progressTasks" group="tasks" item-key="_id" class="flex-1 overflow-y-auto space-y-2 pr-1"
          @change="(e) => onDrop(e, 'inprogress')">
          <template #item="{ element }">
            <div
              class="bg-white/10 p-3 rounded-lg border border-white/10 hover:bg-white/20 transition cursor-grab w-full overflow-hidden">
              <!-- TOP -->
              <div class="flex justify-between items-start">
                <h3 class="text-sm font-semibold">
                  {{ element.title }}
                </h3>
                <!-- ACTION BUTTONS -->
                <div class="flex gap-2">
                  <button @click.stop="editTask(element)" class="text-blue-400 hover:text-blue-300 text-sm">
                    ✏️
                  </button>
                  <button @click.stop="deleteTask(element._id)" class="text-red-400 hover:text-red-300 text-sm"">
                    🗑
                  </button>
                </div>
              </div>

              <!-- DESCRIPTION -->
              <p class=" text-xs text-gray-400 mt-1">
                    {{ element.description }}
                    </p>
                </div>
          </template>
        </draggable>
      </div>

      <!-- DONE -->
      <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col">
        <div class="flex flex-col mb-3 text-green-400 font-semibold">
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold text-green-400">Done</span>
            <span class="bg-white/10 px-2 py-1 rounded text-xs">{{ doneTasks.length }}</span>
          </div>
          <div class="border-b border-green-400/30 mt-3"></div>
        </div>

        <draggable v-model="doneTasks" group="tasks" item-key="_id" class="flex-1 overflow-y-auto space-y-2 pr-1"
          @change="(e) => onDrop(e, 'done')">
          <template #item="{ element }">
            <div
              class="bg-white/10 p-3 rounded-lg border border-white/10 hover:bg-white/20 transition cursor-grab w-full overflow-hidden">
              <!-- TOP -->
              <div class="flex justify-between items-start">
                <h3 class="text-sm font-semibold">
                  {{ element.title }}
                </h3>
                <!-- ACTION BUTTONS -->
                <div class="flex gap-2">
                  <button @click.stop="editTask(element)" class="text-blue-400 hover:text-blue-300 text-sm"">
                    ✏️
                  </button>
                  <button @click.stop=" deleteTask(element._id)" class="text-red-400 hover:text-red-300 text-sm"">
                    🗑
                  </button>
                </div>
              </div>

              <!-- DESCRIPTION -->
              <p class=" text-xs text-gray-400 mt-1">
                    {{ element.description }}
                    </p>
                </div>
          </template>
        </draggable>
      </div>
    </div>
    <!-- EDIT MODAL -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl w-full max-w-md">

        <h2 class="text-xl font-bold mb-4 text-white">Edit Task</h2>

        <!-- TITLE -->
        <input v-model="editTaskData.title"
          class="w-full mb-3 px-3 py-2 rounded bg-white/10 border border-white/20 text-white" placeholder="Title" />

        <!-- DESCRIPTION -->
        <textarea v-model="editTaskData.description"
          class="w-full mb-4 px-3 py-2 rounded bg-white/10 border border-white/20 text-white"
          placeholder="Description"></textarea>

        <!-- BUTTONS -->
        <div class="flex justify-end gap-3">
          <button @click="showEditModal = false" class="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600">
            Cancel
          </button>

          <button @click="updateTask" class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 font-semibold">
            Update
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "./api";
import draggable from "vuedraggable";

// state
const tasks = ref([]);
const todoTasks = ref([]);
const progressTasks = ref([]);
const doneTasks = ref([]);

//Create State
const title = ref("");
const description = ref("");

//Edit State
const showEditModal = ref(false);
const editTaskData = ref({
  _id: "",
  title: "",
  description: "",
});

// fetch tasks
const fetchTasks = async () => {
  const res = await API.get("/tasks");
  tasks.value = res.data;

  todoTasks.value = tasks.value.filter(t => t.status === "todo");
  progressTasks.value = tasks.value.filter(t => t.status === "inprogress");
  doneTasks.value = tasks.value.filter(t => t.status === "done");
};

//CREATE
const addTask = async () => {
  if (!title.value) return;

  try {
    await API.post("/tasks", {
      title: title.value,
      description: description.value,
      status: "todo",
    });

    fetchTasks();

    title.value = "";
    description.value = "";
  } catch (err) {
    console.log(err);
  }
};

// EDIT
const editTask = (task) => {
  editTaskData.value = { ...task };
  showEditModal.value = true;
};

const updateTask = async () => {
  try {
    await API.patch(`/tasks/${editTaskData.value._id}`, {
      title: editTaskData.value.title,
      description: editTaskData.value.description,
    });

    showEditModal.value = false;
    fetchTasks();
  } catch (err) {
    console.log(err);
  }
};

// DELETE
const deleteTask = async (id) => {
  try {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  } catch (err) {
    console.log(err);
  }
};

// update backend when dragged
const onDrop = async (event, newStatus) => {
  if (event.added) {
    const task = event.added.element;

    try {
      await API.patch(`/tasks/${task._id}`, {
        status: newStatus,
      });

      fetchTasks();

    } catch (err) {
      console.log(err);
    }
  }
};

onMounted(fetchTasks);
</script>