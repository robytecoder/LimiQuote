<script setup>
import Navbar from "./components/Navbar.vue";
import { updateAuthState } from "./store";
updateAuthState();
</script>

<template>
  <div class="bg-slate-100 h-screen flex flex-col">
    <Navbar />

    <router-view class="flex-1" :key="$route.params.userId" />
  </div>
</template>
