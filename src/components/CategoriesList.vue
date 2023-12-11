<template>
  <ul class="form-categories-list">
    <CategoriesListItem
      v-for="categorie in categories"
      :key="categorie.id"
      :categorie="categorie"
    />
  </ul>
</template>

<script>
import CategoriesListItem from "@/components/CategoriesListItem.vue";

export default {
  components: { CategoriesListItem },

  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
