import { createStore } from "vuex";
import router from "@/router";
import { Notify } from "notiflix";
import { initializeApp } from "firebase/app";
import {
  getDocs,
  getDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVwde1z2dm5Uok9qriCB4xYYbayI4ogxE",
  authDomain: "kursova-74eae.firebaseapp.com",
  projectId: "kursova-74eae",
  storageBucket: "kursova-74eae.appspot.com",
  messagingSenderId: "33507490229",
  appId: "1:33507490229:web:e9d3498ed139b3ae4901fc",
  measurementId: "G-QLTLP4Z0QJ",
};

const APP = initializeApp(firebaseConfig);

const DB = getFirestore(APP);
const AUTH = getAuth(APP);

export default createStore({
  state: () => ({
    uid: null,
    board: { notes: [] },
    categories: [],
    checkedCategories: [],
    isLoggedIn: false,
  }),

  getters: {
    filteredNotes(state) {
      return state.board.notes.filter((el) => {
        if (state.checkedCategories.length > 0) {
          return state.checkedCategories.includes(String(el.categorie));
        }
        return state.board.notes;
      });
    },
  },

  mutations: {
    setUid(state, data) {
      state.uid = data;
    },

    setIsLoggedIn(state, data) {
      state.isLoggedIn = data;
    },

    setDataFromLs(state, data) {
      const { uid, isLoggedIn } = data;

      state.uid = uid;
      state.isLoggedIn = isLoggedIn;
    },

    setBoard(state, data) {
      if (!data) {
        return;
      }

      state.board = data;
    },

    addNotes(state, data) {
      state.board.notes.push(data);
    },

    addCategories(state, data) {
      state.categories.push(data);
    },

    updateNote(state, data) {
      const idx = state.board.notes.findIndex((el) => el.id === data.id);
      state.board.notes.splice(idx, 1, data);
    },

    deleteNote(state, data) {
      const idx = state.board.notes.findIndex((el) => el.id === data.id);
      state.board.notes.splice(idx, 1);
    },

    checkCategorie(state, data) {
      state.checkedCategories.push(data);
    },

    unCheckCategorie(state, data) {
      const idx = state.checkedCategories.indexOf(data);
      state.checkedCategories.splice(idx, 1);
    },
  },

  actions: {
    SignUp({ commit }, data) {
      createUserWithEmailAndPassword(AUTH, data.email, data.password)
        .then((data) => {
          commit("setUid", data.user.uid);
          commit("setIsLoggedIn", true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", data.user.uid);

          router.push("/board");
        })
        .catch((error) => {
          console.log(error);
          Notify.failure("This email is already in use");
        });
    },

    SignIn({ commit }, data) {
      signInWithEmailAndPassword(AUTH, data.email, data.password)
        .then((data) => {
          commit("setUid", data.user.uid);
          commit("setIsLoggedIn", true);

          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", data.user.uid);

          router.push("/board");
        })
        .catch((error) => {
          Notify.failure("Incorrect Email or Password");
          console.log(error);
        });
    },

    SignOut({ state }) {
      signOut(AUTH).then(() => {
        state.uid = null;
        state.isLoggedIn = null;
        state.categories = [];
        state.board.notes = [];
        localStorage.removeItem("uid");
        localStorage.removeItem("isLoggedIn");

        router.push("/signin");
      });
    },

    fetchCategories({ commit, state }) {
      state.categories = [];
      getDocs(collection(DB, "Categories")).then((res) =>
        res.forEach((el) => commit("addCategories", el.data()))
      );
    },

    fetchNotes({ commit, state }) {
      state.board.notes = [];
      getDoc(doc(DB, "Boards", state.uid)).then((res) =>
        commit("setBoard", res?.data())
      );
    },

    setDataFromLs({ commit }, data) {
      commit("setDataFromLs", data);
    },

    addNote({ commit, state }, data) {
      commit("addNotes", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    updateNote({ commit, state }, data) {
      commit("updateNote", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    deleteNote({ commit, state }, data) {
      commit("deleteNote", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    checkCategorie({ commit }, data) {
      commit("checkCategorie", data);
    },

    unCheckCategorie({ commit }, data) {
      commit("unCheckCategorie", data);
    },
  },
});
