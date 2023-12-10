<template>
  <form class="form__categories">
    <ul>
      <li v-for="categorie in categories" :key="categorie.id">
        <input
          type="checkbox"
          :id="categorie.id"
          :value="categorie.id"
          @change="handleCategoriesChange"
          :name="categorie.type"
          style="display: none"
        />
        <label
          :class="
            checkedCategories.includes(categorie.id) ? 'check' : 'uncheck'
          "
          :for="categorie.id"
          >{{ categorie.type }}</label
        >
      </li>
    </ul>
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
  },
};
</script>

<style>
.check {
  color: purple;
}

.unchek {
  color: #fff;
}
</style>
