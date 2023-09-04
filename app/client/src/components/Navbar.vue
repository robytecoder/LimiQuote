<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { setUser, user } from "../store";
import UsersSearch from "./UsersSearch.vue";

const showMenu = ref(false);
const menu = ref(null);
onClickOutside(menu, (event) => {
  showMenu.value = false;
});
</script>

<template>
  <div class="bg-black px-4 py-2 text-white flex justify-between">
    <div class="flex space-x-5">
      <router-link to="/">
        <h1 class="font-semibold">LimiQuote</h1>
      </router-link>
      <UsersSearch />
    </div>
    <div class="flex space-x-5">
      <span>{{ user ? user.name : "" }}</span>

      <div>
        <svg
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
            class="absolute bg-white text-black right-0 px-3 py-2 shadow-md rounded text-sm"
          >
            <div>
              <button
                v-if="!user"
                @click="setUser({ name: 'Roberto' }), (showMenu = false)"
              >
                Login
              </button>
              <button v-if="user" @click="setUser(null), (showMenu = false)">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
