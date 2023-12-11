<template>
  <form class="form-categories">
    <h1 class="form-categories-title">Categories</h1>

    <CategoriesList />

    <button type="button" class="form-categories-add-categorie">
      add categorie
    </button>
  </form>
</template>

<script>
import CategoriesList from "./CategoriesList.vue";

export default {
  components: {
    CategoriesList,
  },
};
</script>

<style>
@import "../styles/categoriesFilter.css";
</style>
