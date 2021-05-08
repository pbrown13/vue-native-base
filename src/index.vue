<template>
  <view
    class="container"
    :class="{ 'container-android': Platform.OS === 'android' }"
  >
    <Navigation />
  </view>
</template>

<script>
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import { Platform } from "react-native";
import { AsyncStorage } from "react-native";

import store from "./store";
import Navigation from "./navigation";
//import moment from "moment";
import AppNavigationEvents from "./components/AppNavigationEvents";
Vue.use(VueNativeBase);
// Vue.use(Vuelidate);
// Vue.use(require("vue-moment"));
//Vue.component("Platform", Platform);
// Registering Component
Vue.component("AppNavigationEvents", AppNavigationEvents);

// Provide store to global context of vue
Vue.prototype.$store = store;

Vue.filter("upperCase", function(value) {
  if (!value) return "";

  return value.toUpperCase();
});
Vue.filter("lowerCase", function(value) {
  if (!value) return "";

  return value.toLowerCase();
});

export default {
  components: {
    Navigation
  },
  data() {
    return {
      Platform
    };
  },
  computed: {},
  created() {
    //this.$store.dispatch("auth/verifyDeez").catch(() => {});
  }
};
</script>

<style>
.container {
  flex: 1;
}

.container-android {
  padding-top: 23px;
}

.spinner-container {
  display: flex;
  justify-content: center;
}
</style>
