import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Home from "./components/Home.vue";
import UserSocial from "./components/UserSocial.vue";
import UserBio from "./components/UserBio.vue";
import UserMessages from "./components/UserMessages.vue";
import UserFollowers from "./components/UserFollowers.vue";
import UserFollowed from "./components/UserFollowed.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/social",
      component: UserSocial,
      children: [
        {
          path: "users/:userId",
          component: UserBio,
        },
        {
          path: "messages/:userId",
          component: UserMessages,
        },
        {
          path: "followers/:userId",
          component: UserFollowers,
        },
        {
          path: "followed/:userId",
          component: UserFollowed,
        },
      ],
    },
    //  {
    //    path: "/auth",
    //    component: Auth,
    //    children: [
    //      {
    //        path: "signIn",
    //        component: SignIn,
    //      },
    //      {
    //        path: "signUp",
    //        component: SignUp,
    //      },
    //    ],
    //  },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
