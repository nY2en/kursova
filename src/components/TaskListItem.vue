<template>
  <li class="task-item">
    <textarea
      class="task-textarea"
      :value="task.text"
      @input="handleTextAreaChange"
      placeholder="Type sth..."
    ></textarea>

    <select
      v-if="categories.length > 0"
      @change="handleSelectChange"
      class="task-select"
    >
      <option
        v-for="categorie in categories"
        :key="categorie.id"
        :value="categorie.id"
        :selected="categorie.id === task.categorie"
      >
        {{ categorie.type }}
      </option>
    </select>

    <button @click="handleBtnDeleteClick(task)" class="task-btn">
      <svg class="task-icon">
        <use href="../assets/symbol-defs.svg#icon-bin"></use>
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },

  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },

  methods: {
    handleTextAreaChange(e) {
      const taskToUpdate = { ...this.task, text: e.target.value };

      this.$store.dispatch("updateTask", taskToUpdate);
    },

    handleSelectChange(e) {
      const taskToUpdate = {
        ...this.task,
        categorie: Number(e.target.value),
      };

      this.$store.dispatch("updateTask", taskToUpdate);
    },

    handleBtnDeleteClick(data) {
      this.$store.dispatch("deleteTask", data);
    },
  },
};
</script>
