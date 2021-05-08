import Vue from "vue-native-core";
//import axiosInstance from "@/services/axios.js";
import axios from "axios";
import { Platform } from "react-native";
import { AsyncStorage } from "react-native";

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false,
    userId: null,
    token: null,
    cardKey: 0,
    baseURL: "https://lilbigdog.bubbleapps.io/version-test/api/1.1",
    deez: null
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    }
  },
  actions: {
    //reset pass endpoint
    forceRender({ commit }) {
      commit("forceRender");
    },

    bubbleLogin({ commit, state, dispatch }, userData) {
      return axios
        .post("https://lilbigdawg.bubbleapps.io/api/1.1/wf/login", userData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          const user = res.data.response;
          const id = user.data._id;
          // THIS IS ACTUALLY THE BUBBLE TOKEN
          AsyncStorage.setItem("token", user.token);
          //THIS IS ACTUALLY THE USER ID
          AsyncStorage.setItem("dope", user.data._id);
          commit("setAuthUser", user);
          commit("setUserId", user.data._id);
          commit("setToken", user.token);
          dispatch("getUserTrips", user.data._id);
          return state.user;
        })
        .catch(e => {
          alert(JSON.stringify("login failed"));
        });
    },
    altRegister({ commit, dispatch }, userData) {
      const dope = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        pass: userData.password
      };
      return axios
        .post("https://lilbigdawg.bubbleapps.io/api/1.1/wf/signup", dope)
        .then(res => {
          const user = res.data.response;
          commit("setAuthUser", userData);
          return userData;
        });
    },
    // THIS IS STORING ALL THE USER DATA IN FIREBASE DB
    // ALSO IDK WHY BUT IF YOU REMOVE THIS THE APP BREAKS

    // THIS CLEARS THE ASYNC STORAGE && THE STATE -- I KEPT FUCKING THAT UP SO DON'T FORGET
    logout({ commit }) {
      return new Promise(resolve => {
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("dope");
        AsyncStorage.removeItem("token");
        commit("setAuthUser", null);
        commit("setUserId", null);
        commit("setAuthUser", null);

        resolve();
      });
    },
    // THIS ACTUALLY WORKS, SORRY ABOUT THE NAMING CONVENTION.
    async verifyDeez({ dispatch, commit, state }) {
      const token = await AsyncStorage.getItem("token");
      if (!!token) {
        const body = {};
        return axios
          .post("https://lilbigdawg.bubbleapps.io/api/1.1/wf/is_auth", body, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            const user = res.data.response.user;
            commit("setAuthUser", user);
            commit("setUserId", user._id);
            commit("resolveAuth");
            return state.user;
          })
          .catch(e => {
            return e;
            dispatch("logout");
          });
      } else {
        console.log("Login Required");
        //dispatch("logout");
      }
    }
  },
  mutations: {
    //A TEST
    setDeez(state, payload) {
      state.deez = payload;
    },
    forceRender(state) {
      state.cardKey++;
    },

    setAuthUser(state, user) {
      return (state.user = user);
    },
    resolveAuth(state) {
      state.isAuthResolved = true;
    },
    setUserId(state, payload) {
      state.userId = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  }
};
