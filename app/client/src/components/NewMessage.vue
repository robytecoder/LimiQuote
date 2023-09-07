<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { buttonPrimaryClasses } from "../lib";
import axios from "axios";

defineProps({ isOpen: { type: Boolean } });
const emit = defineEmits(["close"]);

async function submit(e) {
  errorMessage.value = null;
  try {
    const data = Object.fromEntries(new FormData(e.target));
    const response = await axios.post("/api/social/messages", data);
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
    class="fixed bg-white shadow-lg space-y-2 p-4 pb-2 rounded w-full max-w-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex justify-between items-center">
      <h3 class="font-semibold text-lg">Nuovo messaggio</h3>
      <button @click="$emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-square"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </button>
    </div>
    <form @submit.prevent="submit" class="flex flex-col pb-4">
      <textarea
        name="text"
        cols="30"
        rows="5"
        class="border-gray-200 border my-2 focus:border-slate-400 focus:outline-none focus:ring-0"
      ></textarea>
      <div class="flex justify-center">
        <button
          class="w-min px-8 mt-4"
          type="button"
          :class="buttonPrimaryClasses"
        >
          Invia
        </button>
      </div>
    </form>
    <div
      v-if="errorMessage"
      class="bg-red-50 border-red-100 text-red-400 px-3 py-2 rounded"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
