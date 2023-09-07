<script setup>
import { currentUser } from "../store";
import { ref } from "vue";
import { buttonPrimaryClasses } from "../lib";
import NewMessage from "../components/NewMessage.vue";

const isOpen = ref(false);
</script>

<template>
  <div v-if="currentUser" class="p-4">
    <button @click="isOpen = true" type="button" :class="buttonPrimaryClasses">
      Nuovo messaggio
    </button>
    <NewMessage :isOpen="isOpen" @close="isOpen = false" />
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="p-10 text-8xl font-semibold">LimiQuote</h1>
    <h2 class="p-10 text-3xl font-semibold">
      Express Yourself through Quotes on our Social Platform.
    </h2>
  </div>
</template>
