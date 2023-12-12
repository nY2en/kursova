<template>
  <div class="page-wrapper">
    <form class="form-categories">
      <h1 class="form-categories-title">Categories</h1>

      <CategoriesList />

      <button
        type="button"
        class="form-categories-add-categorie"
        @click="handleModalOpen"
      >
        Add Categorie
      </button>
    </form>

    <div class="task-wrapper">
      <h1 class="task-title">Tasks</h1>

      <TaskList />

      <button class="task-add-btn" @click="addTask">Add task</button>
    </div>

    <!-- <button class="btn" @click="signOut">Sign Out</button> -->

    <ModalWindow v-if="isModalOpen" />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import CategoriesList from "@/components/CategoriesList.vue";
import ModalWindow from "@/components/ModalWindow.vue";

export default {
  components: { TaskList, CategoriesList, ModalWindow },

  created() {
    if (localStorage.getItem("uid") && localStorage.getItem("isLoggedIn")) {
      const data = {
        uid: localStorage.getItem("uid"),
        isLoggedIn: localStorage.getItem("isLoggedIn"),
      };

      this.$store.dispatch("setDataFromLs", data);
    }

    if (!this.isLoggedIn) {
      this.$router.push("/signin");
      return;
    }

    this.$store.dispatch("fetchBoard");
  },

  computed: {
    uid() {
      return this.$store.getters.uid;
    },

    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    categories() {
      return this.$store.getters.categories;
    },

    isModalOpen() {
      return this.$store.getters.isModalOpen;
    },
  },

  methods: {
    handleModalOpen() {
      this.$store.dispatch("toggleModal");
    },

    addTask() {
      const newTask = {
        id: Date.now(),
        uid: this.uid,
        text: "",
        categorie: this?.categories[0]?.id || null,
      };

      this.$store.dispatch("addTask", newTask);
    },

    signOut() {
      this.$store.dispatch("SignOut");
    },
  },
};
</script>

<style>
@import "../styles/form-categories.css";
@import "../styles/task-list.css";

.page-wrapper {
  display: flex;

  padding: 80px 0;

  justify-content: space-between;
}
</style>
