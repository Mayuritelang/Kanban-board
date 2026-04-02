import { defineStore } from "pinia";
import API from "../api";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
  }),

  getters: {
    todoTasks: (state) => state.tasks.filter(t => t.status === "todo"),
    progressTasks: (state) => state.tasks.filter(t => t.status === "inprogress"),
    doneTasks: (state) => state.tasks.filter(t => t.status === "done"),
  },

 actions: {
  async fetchTasks() {
    const res = await API.get("/tasks");
    this.tasks = res.data;
  },

  async addTask(payload) {
    const res = await API.post("/tasks", payload);
    this.tasks.push(res.data);
  },

  async updateTask(id, data) {
    const index = this.tasks.findIndex(t => t._id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...data };
    }

    try {
      await API.patch(`/tasks/${id}`, data);
    } catch (err) {
      console.log(err);
      this.fetchTasks();
    }
  },

  async deleteTask(id) {
    this.tasks = this.tasks.filter(t => t._id !== id);

    try {
      await API.delete(`/tasks/${id}`);
    } catch (err) {
      console.log(err);
      this.fetchTasks();
    }
  }
}
});