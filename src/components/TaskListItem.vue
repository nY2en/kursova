<template>
  <li>
    <textarea
      :value="task.text"
      @input="handleTextAreaChange"
      placeholder="Type sth..."
    ></textarea>

    <select @change="handleSelectChange" v-if="categories.length > 0">
      <option
        v-for="categorie in categories"
        :key="categorie.id"
        :value="categorie.id"
        :selected="categorie.id === task.categorie"
      >
        {{ categorie.type }}
      </option>
    </select>

    <button @click="handleBtnDeleteClick(task)">X</button>
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
