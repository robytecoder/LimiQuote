<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="bg-slate-100 h-screen flex flex-col">
    <Navbar />
    <router-view />
  </div>
</template>
