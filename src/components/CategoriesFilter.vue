<template>
  <form class="form-categories">
    <h1 class="form-categories-title">Categories</h1>
    <ul class="form-categories-list">
      <li
        v-for="categorie in categories"
        :key="categorie.id"
        class="form-categories-item"
      >
        <label
          class="form-categories-label"
          :class="
            checkedCategories.includes(categorie.id)
              ? 'form-filter-checked'
              : 'form-filter-uncheked'
          "
          >{{ categorie.type }}

          <input
            type="checkbox"
            :value="categorie.id"
            @change="handleCategoriesChange"
            :name="categorie.type"
            class="form-filter-input"
        /></label>

        <button type="button" @click="handleBtnDeleteClick(categorie.id)">
          del
        </button>
      </li>
    </ul>

    <button type="button" class="form-categories-add-categorie">
      add categorie
    </button>
  </form>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    checkedCategories() {
      return this.$store.getters.checkedCategories;
    },
  },

  methods: {
    handleCategoriesChange(e) {
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

<style>
.form-categories {
  padding: 20px;

  background-color: rgba(255, 255, 255, 0.2);

  border-radius: 15px;

  overflow: auto;
}

.form-categories-title {
  font-size: 32px;
}

.form-categories-list {
  margin-bottom: 16px;
}

.form-categories-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.form-filter-input {
  display: none;
}

.form-filter-checked {
  color: teal;
}

.form-filter-uncheked {
  color: #fff;
}

.form-categories-add-categorie {
  display: block;
  margin: 0 auto;
  padding: 8px 16px;

  font-family: Kalam, sans-serif;

  border: none;
  border-radius: 8px;

  background: rgba(0, 0, 0, 0.3);

  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);

  color: #fff;
}

.form-categories-add-categorie:hover,
.form-categories-add-categorie:focus {
  background: rgba(0, 0, 0, 0.5);
}
</style>
