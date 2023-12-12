<template>
  <div class="backdrop" @click="handleBackdropCLick">
    <form autocomplete="off" class="modal" @click="addCategorie">
      <input
        type="text"
        name="type"
        class="modal-input"
        placeholder="enter categorie ..."
      />

      <button type="submit" class="modal-btn">Add</button>
    </form>
  </div>
</template>

<script>
import { Notify } from "notiflix";

export default {
  computed: {
    uid() {
      return this.$store.getters.uid;
    },

    categories() {
      return this.$store.getters.categories;
    },
  },

  methods: {
    handleBackdropCLick(e) {
      if (e.target === e.currentTarget) {
        this.$store.dispatch("toggleModal");
      }
    },

    addCategorie(e) {
      e.preventDefault();

      const text = e.currentTarget.elements.type.value.trim().toLowerCase();

      if (e.target.classList.contains("modal-btn")) {
        if (text === "") {
          Notify.failure("Pls, enter categorie");
          return;
        }

        if (this.categories.find((el) => el.type.includes(text))) {
          Notify.failure("You already have the same category");
          return;
        }

        const newCategorie = {
          id: Date.now(),
          uid: this.uid,
          type: text,
        };

        this.$store.dispatch("addCategorie", newCategorie);
        this.$store.dispatch("toggleModal");
      }
    },
  },
};
</script>

<style>
.backdrop {
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  border-radius: 15px;

  background-color: rgba(255, 255, 255, 0.3);
}

.modal-input {
  width: 100%;
  margin-bottom: 32px;
  padding: 8px 0;

  font-size: 20px;

  border: none;
  outline: none;
  border-bottom: 2px solid #fff;

  background-color: transparent;

  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-input::placeholder {
  font-family: Kalam, sans-serif;
  font-size: 20px;
}

.modal-input:focus-within {
  border-color: teal;
}

.modal-btn {
  align-self: center;
  padding: 10px 30px;
  width: 100%;

  font-family: Kalam, sans-serif;
  font-size: 16px;

  outline: none;
  border: none;
  border-radius: 12px;

  background: rgba(0, 0, 0, 0.3);
  color: #fff;

  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-btn :hover,
.modal-btn :focus {
  background: rgba(0, 0, 0, 0.5);
}
</style>
