<template>
  <div style="display: flex; padding: 40px">
    <CategoriesFilter />
    <NoteCard
      v-for="(note, index) in filteredNotes"
      :key="note.id"
      :note="note"
      :idx="index"
    />

    <button class="btn btn--add" @click="addNote">Add note</button>
    <button class="btn btn--signout" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import CategoriesFilter from "@/components/CategoriesFilter.vue";

export default {
  components: { NoteCard, CategoriesFilter },

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

    filteredNotes() {
      return this.$store.getters.filteredNotes;
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
.btn {
  position: fixed;
  padding: 10px 30px;

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

.btn--add {
  top: 0;
  right: 0;
}

.btn--signout {
  top: 10%;
  right: 0;
}
</style>
