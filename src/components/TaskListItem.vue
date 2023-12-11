<template>
  <li>
    <textarea
      :value="note.text"
      @input="handleTextAreaChange"
      placeholder="Type sth..."
    ></textarea>

    <select @change="handleSelectChange">
      <option
        v-for="categorie in categories"
        :key="categorie.id"
        :value="categorie.id"
        :selected="categorie.id === note.categorie"
      >
        {{ categorie.type }}
      </option>
    </select>

    <button @click="deleteNote(note)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    note: {
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
      const noteToUpdate = { ...this.note, text: e.target.value };

      this.$store.dispatch("updateNote", noteToUpdate);
    },

    handleSelectChange(e) {
      const noteToUpdate = { ...this.note, categorie: Number(e.target.value) };

      this.$store.dispatch("updateNote", noteToUpdate);
    },

    deleteNote(data) {
      this.$store.dispatch("deleteNote", data);
    },
  },
};
</script>
