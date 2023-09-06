<script setup>
import { currentUser } from "../store";
import { ref } from "vue";
import NewMessage from "../components/NewMessage.vue";

const isOpen = ref(false);
</script>

<template>
  <div v-if="currentUser" class="p-4">
    <button
      @click="isOpen = true"
      type="button"
      class="bg-slate-500 rounded hover:bg-slate-600 text-white px-3 py-2"
    >
      Nuovo messaggio
    </button>
    <NewMessage :isOpen="isOpen" @close="isOpen = false" />
  </div>
  <div v-else class="flex justify-center items-center">
    <h2 class="text-2xl font-semibold">Benvenuto in LimiQuote</h2>
  </div>
</template>
