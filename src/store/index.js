import Vuex from "vuex";
import Vue from "vue-native-core";
import axios from "axios";
import { Platform } from "react-native";

//modules
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    auth
  }
});
