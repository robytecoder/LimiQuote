<script setup>
import { defineProps, defineEmits, ref } from "vue";
import axios from "axios";

defineProps({ isOpen: { type: Boolean } });
const emit = defineEmits(["close"]);

async function submit(e) {
  errorMessage.value = null;
  try {
    const data = Object.fromEntries(new FormData(e.target));
    const response = await axios.post("/api/social/messagesasass", data);
    emit("close");
  } catch (error) {
    errorMessage.value = error.message;
  }
}

const errorMessage = ref(null);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50"></div>
  <div
    v-if="isOpen"
    class="fixed bg-white shadow-lg space-y-2 p-4 rounded w-full max-w-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex justify-between items-center">
      <h3>Nuovo messaggio</h3>
      <button @click="$emit('close')">x</button>
    </div>
    <form @submit.prevent="submit" class="flex flex-col">
      <textarea
        name="text"
        cols="30"
        rows="5"
        class="border-gray-200 border"
      ></textarea>
      <button>Invia</button>
    </form>
    <div
      v-if="errorMessage"
      class="bg-red-50 border-red-100 text-red-400 px-3 py-2 rounded"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
