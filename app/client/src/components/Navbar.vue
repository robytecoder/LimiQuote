<script setup>
import UsersSearch from "./UsersSearch.vue";
import { formatUserName } from "../lib";
import { setCurrentUser, currentUser, updateAuthState } from "../store";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const showMenu = ref(false);
const menu = ref(null);

onClickOutside(menu, (event) => {
  showMenu.value = false;
});

let router = useRouter();

async function signOut() {
  const res = await axios.post("/api/auth/signout");
  updateAuthState();
  router.push({ name: "home" });
}
</script>

<template>
  <div class="bg-black px-4 py-2 text-white flex justify-between">
    <div class="flex space-x-5">
      <router-link to="/">
        <h1 class="text-xl font-semibold">LimiQuote</h1>
      </router-link>
      <UsersSearch />
    </div>

    <div class="flex space-x-5 items-center" v-if="currentUser">
      <router-link
        :to="{ name: 'userMessages', params: { userId: currentUser.id } }"
        class="hidden md:block"
      >
        {{ formatUserName(currentUser) }}
      </router-link>
      <div>
        <svg
          class="hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click="showMenu = !showMenu"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
        <div class="relative" v-if="showMenu" ref="menu">
          <div
            class="absolute top-2 w-24 bg-white text-black right-0 shadow-md rounded text-sm"
          >
            <router-link
              class="block text-left px-3 py-2 w-full hover:bg-black hover:text-white hover:font-semibold"
              :to="{ name: 'home', params: { userId: currentUser.id } }"
            >
              Home
            </router-link>
            <router-link
              class="block text-left px-3 py-2 w-full hover:bg-black hover:text-white hover:font-semibold"
              :to="{ name: 'userMessages', params: { userId: currentUser.id } }"
            >
              My Profile
            </router-link>
            <button
              class="block text-left px-3 py-2 w-full hover:bg-black hover:text-white hover:font-semibold"
              v-if="currentUser"
              @click="signOut(), (showMenu = false)"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center divide-x-2 divide-white" v-else>
      <router-link
        :to="{ name: 'signin' }"
        v-if="!currentUser"
        @click="showMenu = false"
        class="pr-4"
      >
        Sign In
      </router-link>
      <router-link
        :to="{ name: 'signup' }"
        v-if="!currentUser"
        @click="showMenu = false"
        class="pl-4"
      >
        Sign Up
      </router-link>
    </div>
  </div>
</template>
