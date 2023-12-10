<template>
  <div>
    <CategoriesFilter />
    <NoteCard
      v-for="(note, index) in filteredNotes"
      :key="note.id"
      :note="note"
      :idx="index"
    />

    <button class="btn bottom" @click="addNote">Add note</button>
    <button class="btn top" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import NoteCard from "@/components/NoteCard.vue";
import CategoriesFilter from "@/components/CategoriesFilter.vue";

export default {
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

  components: { NoteCard, CategoriesFilter },

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

  padding: 12px;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  border-radius: 12px;
  border: none;

  background-color: #fa8072;
  color: #fff;

  transition: transform 250ms linear;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
}

.top {
  top: 1%;
  right: 1%;
}

.bottom {
  bottom: 1%;
  right: 1%;
}
</style>
