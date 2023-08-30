<script setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import LogoutButton from "./components/LogoutButton.vue";
import LoginForm from "./components/LoginForm.vue";

import { user, updateAuthState } from "./store";

fetch("/api/other/messages").then(async (res) => {
  const messages = await res.json();
  console.log(messages);
});

updateAuthState();
</script>

<template>
  <div class="min-h-screen">
    <header class="flex justify-between px-4 py-2 bg-gray-800 text-white">
      <div>logo</div>
      <div v-if="user">{{ user.name }} {{ user.surname }}</div>
    </header>
    <LogoutButton />
    <LoginForm />
  </div>
</template>
