<template>
  <div class="page-wrapper">
    <form class="form-categories">
      <h1 class="form-categories-title">Categories</h1>

      <CategoriesList />

      <button type="button" class="form-categories-add-categorie">
        Add Categorie
      </button>
    </form>

    <div class="task-wrapper">
      <h1 style="font-size: 44px; text-align: center">Tasks</h1>
      <button class="btn" @click="addNote">Add note</button>
      <TaskList />
    </div>

    <!-- <button class="btn" @click="signOut">Sign Out</button> -->
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import CategoriesList from "@/components/CategoriesList.vue";

export default {
  components: { TaskList, CategoriesList },

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

    this.$store.dispatch("fetchNotes");
    this.$store.dispatch("fetchCategories");
  },

  computed: {
    uid() {
      return this.$store.getters.uid;
    },

    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  methods: {
    addNote() {
      const newNote = {
        id: Date.now(),
        uid: this.uid,
        text: "",
        categorie: 1,
      };

      this.$store.dispatch("addNote", newNote);
    },

    signOut() {
      this.$store.dispatch("SignOut");
    },
  },
};
</script>

<style scoped>
@import "../styles/form-categories.css";
.page-wrapper {
  display: flex;

  padding: 80px 0;

  justify-content: space-between;
}

.task-wrapper {
  align-self: flex-start;
  padding: 20px 40px;

  border-radius: 12px;

  width: 1000px;

  background-color: rgba(255, 255, 255, 0.2);
}

.task-list {
  overflow: auto;
  max-height: 700px;
}

.btn {
  align-self: center;
  padding: 10px 30px;
  width: 100%;

  margin-bottom: 16px;

  font-family: Kalam, sans-serif;
  font-size: 16px;

  outline: none;
  border: none;
  border-radius: 12px;

  background: rgba(0, 0, 0, 0.3);
  color: #fff;

  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover,
.btn:focus {
  background: rgba(0, 0, 0, 0.5);
}
</style>
