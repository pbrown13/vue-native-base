<template>
  <root>
    <AppNavigation />
  </root>
</template>
<script>
import HomeScreen from "./screens/HomeScreen.vue";
import LoginScreen from "./screens/LoginScreen.vue";
import FeedScreen from "./screens/FeedScreen.vue";
import ProfileScreen from "./screens/ProfileScreen.vue";
import SwipeScreen from "./screens/SwipeScreen.vue";
import Staging from "./screens/Staging.vue";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Root } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Platform } from "react-native";

const ProfileStack = createStackNavigator(
  {
    ProfileScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Feed: FeedScreen,
    Swipe: SwipeScreen,
    Staging
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);
// HomeStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible;
//   if (navigation.state.routes.length > 1) {
//     navigation.state.routes.map(route => {
//       if (route.routeName === "RoomDetails") {
//         tabBarVisible = false;
//       } else {
//         tabBarVisible = true;
//       }
//     });
//   }
//   return {
//     tabBarVisible
//   };
// };
const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const TabNavigation = createBottomTabNavigator(
  {
    Explore: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Explore",
        tabBarOptions: {
          activeTintColor: "blue",
          inactiveTintColor: "gray"
        },
        tabBarIcon: <Icon name="compass" size={25} />
      }
    },

    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarOptions: {
          activeTintColor: "blue"
        },
        tabBarIcon: <Icon name="user-circle" size={25} />
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      showLabel: true
    }
  }
);
const AppNavigation = createAppContainer(
  createSwitchNavigator({
    tabs: TabNavigation
  })
);
export default {
  components: { AppNavigation, Root, Platform },
  data() {
    return {
      activeScreen: "homeScreen"
    };
  },
  computed: {
    androidPad() {
      return Platform.OS === "android" ? 10 : 0;
    }
  }
};
</script>
