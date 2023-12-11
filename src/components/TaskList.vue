<template>
  <ul class="task-list">
    <TaskListItem v-for="task in filteredTasks" :key="task.id" :task="task" />
  </ul>
</template>

<script>
import TaskListItem from "./TaskListItem.vue";

export default {
  components: { TaskListItem },

  computed: {
    filteredTasks() {
      return this.$store.getters.filteredTasks;
    },
  },
};
</script>
