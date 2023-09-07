<script setup>
import Navbar from "./components/Navbar.vue";
import { updateAuthState } from "./store";
updateAuthState();
</script>

<template>
  <div class="bg-zinc-200 min-h-screen flex flex-col">
    <Navbar />

    <router-view class="flex-1" :key="$route.params.userId" />
  </div>
</template>
