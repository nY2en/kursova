<template>
  <li class="form-categories-item">
    <label
      class="form-categories-label"
      :class="
        checkedCategories.includes(categorie.id)
          ? 'form-filter-checked'
          : 'form-filter-uncheked'
      "
    >
      {{ categorie.type }}

      <input
        type="checkbox"
        :value="categorie.id"
        @change="handleBtnChangeClick"
        :name="categorie.type"
        class="form-filter-input"
    /></label>

    <button
      type="button"
      @click="handleBtnDeleteClick(categorie.id)"
      class="form-categories-delete-categorie"
    >
      <svg class="form-categories-icon">
        <use href="../assets/symbol-defs.svg#icon-bin"></use>
      </svg>
    </button>
  </li>
</template>

<script>
export default {
  props: {
    categorie: {
      type: Object,
      required: true,
    },
  },

  computed: {
    checkedCategories() {
      return this.$store.getters.checkedCategories;
    },
  },

  methods: {
    handleBtnChangeClick(e) {
      if (e.target.checked) {
        this.$store.dispatch("checkCategorie", Number(e.target.value));
      } else this.$store.dispatch("unCheckCategorie", Number(e.target.value));
    },

    handleBtnDeleteClick(id) {
      console.log(id);
    },
  },
};
</script>
