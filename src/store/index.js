import { createStore } from "vuex";
import router from "@/router";
import { Notify } from "notiflix";
import { initializeApp } from "firebase/app";
import { getDoc, doc, getFirestore, setDoc } from "firebase/firestore";

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
    board: {
      tasks: [],
      categories: [],
    },
    checkedCategories: [],
    isLoggedIn: false,
    isModalOpen: false,
    email: "",
  }),

  getters: {
    filteredTasks(state) {
      return state.board.tasks
        .filter((el) => {
          if (state.checkedCategories.length > 0) {
            return state.checkedCategories.includes(el.categorie);
          }
          return state.board.tasks;
        })
        .sort((a, b) => b?.closed?.localeCompare(a?.closed));
    },

    categories(state) {
      return state.board.categories;
    },

    checkedCategories(state) {
      return state.checkedCategories;
    },

    isLoggedIn(state) {
      return state.isLoggedIn;
    },

    uid(state) {
      return state.uid;
    },

    isModalOpen(state) {
      return state.isModalOpen;
    },

    email(state) {
      return state.email;
    },
  },

  mutations: {
    setUid(state, data) {
      state.uid = data;
    },

    setIsLoggedIn(state, data) {
      state.isLoggedIn = data;
    },

    setEmail(state, data) {
      state.email = data;
    },

    setDataFromLs(state, data) {
      const { uid, isLoggedIn, email } = data;

      state.uid = uid;
      state.isLoggedIn = isLoggedIn;
      state.email = email;
    },

    setBoard(state, data) {
      if (!data) {
        return;
      }

      state.board = data;
    },

    addTask(state, data) {
      state.board.tasks.push(data);
    },

    updateTask(state, data) {
      const idx = state.board.tasks.findIndex((el) => el.id === data.id);
      state.board.tasks.splice(idx, 1, data);
    },

    deleteTask(state, data) {
      const idx = state.board.tasks.findIndex((el) => el.id === data.id);
      state.board.tasks.splice(idx, 1);
    },

    addCategorie(state, data) {
      state.board.categories.push(data);

      state.board.tasks.filter((el) => {
        if (el.categorie === null) {
          el.categorie = state.board.categories[0].id;
        }

        return el;
      });
    },

    deleteCategorie(state, data) {
      const idx = state.board.categories.findIndex((el) => el.id === data.id);
      state.board.categories.splice(idx, 1);
    },

    checkCategorie(state, data) {
      state.checkedCategories.push(data);
    },

    unCheckCategorie(state, data) {
      const idx = state.checkedCategories.indexOf(data);
      state.checkedCategories.splice(idx, 1);
    },

    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
  },

  actions: {
    SignUp({ commit }, data) {
      createUserWithEmailAndPassword(AUTH, data.email, data.password)
        .then((data) => {
          commit("setUid", data.user.uid);
          commit("setIsLoggedIn", true);
          commit("setEmail", data.user.email);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", data.user.uid);
          localStorage.setItem("email", data.user.email);

          router.push("/board");
        })
        .catch((error) => {
          Notify.failure("This email is already in use");
          console.log(error);
        });
    },

    SignIn({ commit }, data) {
      signInWithEmailAndPassword(AUTH, data.email, data.password)
        .then((data) => {
          commit("setUid", data.user.uid);
          commit("setIsLoggedIn", true);
          commit("setEmail", data.user.email);

          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", data.user.uid);
          localStorage.setItem("email", data.user.email);

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
        state.email = "";
        state.board.tasks = [];
        state.checkedCategories = [];
        state.isModalOpen = false;
        localStorage.removeItem("uid");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");

        router.push("/signin");
      });
    },

    fetchBoard({ commit, state }) {
      state.board.tasks = [];
      state.board.categories = [];
      getDoc(doc(DB, "Boards", state.uid)).then(
        (res) => commit("setBoard", res.data()) // res.?data()
      );
    },

    setDataFromLs({ commit }, data) {
      commit("setDataFromLs", data);
    },

    addTask({ commit, state }, data) {
      commit("addTask", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    addCategorie({ commit, state }, data) {
      commit("addCategorie", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    updateTask({ commit, state }, data) {
      commit("updateTask", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    deleteTask({ commit, state }, data) {
      commit("deleteTask", data);
      setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
    },

    deleteCategorie({ commit, state }, data) {
      const index = state.board.tasks.findIndex(
        (el) => el.categorie === data.id
      );

      if (index === -1) {
        commit("deleteCategorie", data);
        setDoc(doc(DB, "Boards", `${data.uid}`), state.board);
        return;
      }

      Notify.failure("This categorie is beind used in tasks");
    },

    checkCategorie({ commit }, data) {
      commit("checkCategorie", data);
    },

    unCheckCategorie({ commit }, data) {
      commit("unCheckCategorie", data);
    },

    toggleModal({ commit }) {
      commit("toggleModal");
    },
  },
});
