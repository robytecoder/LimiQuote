<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { setCurrentUser, currentUser, updateAuthState } from "../store";
import UsersSearch from "./UsersSearch.vue";
import { formatUserName } from "../lib";

const showMenu = ref(false);
const menu = ref(null);
onClickOutside(menu, (event) => {
  showMenu.value = false;
});

async function logout() {
  const res = await fetch("/api/auth/signout", {
    method: "POST",
  });
  console.log(res);
  if (res.ok) {
    updateAuthState();
  }
  //   let body = await res.json();
  //   console.log(body);
}
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
      <span>{{ currentUser ? formatUserName(currentUser) : "" }}</span>

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
              <router-link
                v-if="!currentUser"
                :to="{ name: 'signIn' }"
                @click="showMenu = false"
              >
                Login
              </router-link>
              <button v-if="currentUser" @click="logout(), (showMenu = false)">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
