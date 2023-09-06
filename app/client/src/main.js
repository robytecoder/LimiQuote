import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import SignIn from "./routes/SignIn.vue";
import Home from "./routes/Home.vue";
import UserSocial from "./routes/UserSocial.vue";
import UserBio from "./routes/UserBio.vue";
import UserMessages from "./routes/UserMessages.vue";
import UserFollowers from "./routes/UserFollowers.vue";
import UserFollowed from "./routes/UserFollowed.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "auth",
      path: "/auth",
      children: [
        {
          name: "signIn",
          path: "signIn",
          component: SignIn,
        },
        // {
        //   name: "signUp",
        //   path: "signUp",
        //   component: SignUp,
        // },
      ],
    },
    {
      // name: "social",
      path: "/social/users/:userId",
      component: UserSocial,
      children: [
        {
          name: "userBio",
          path: "bio",
          component: UserBio,
        },
        {
          name: "userMessages",
          path: "messages",
          component: UserMessages,
        },
        {
          name: "userFollowers",
          path: "followers",
          component: UserFollowers,
        },
        {
          name: "userFollowed",
          path: "followed",
          component: UserFollowed,
        },
      ],
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
