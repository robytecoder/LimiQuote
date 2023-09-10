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
    errorMessage.value = error.response.data.errors[0];
  }
}

const errorMessage = ref(null);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/75"></div>
  <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto">
    >
    <div class="flex min-h-full items-center justify-center p-8">
      <div
        class="w-full max-w-xl overflow-hidden bg-zinc-100 p-8 shadow-xl rounded-xl"
      >
        <div class="flex justify-between items-center">
          <h3 class="font-semibold text-lg">New Quote</h3>
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
        <form @submit.prevent="submit" class="flex flex-col">
          <textarea
            name="text"
            spellcheck="false"
            cols="30"
            rows="5"
            class="font-serif border-gray-200 border my-2 focus:border-slate-400 focus:outline-none focus:ring-0"
          ></textarea>
          <div class="flex justify-center">
            <button
              class="w-min px-8 mt-2"
              type="submit"
              :class="buttonPrimaryClasses"
            >
              Share
            </button>
          </div>
        </form>
        <div
          v-if="errorMessage"
          class="bg-red-50 border-red-100 text-red-400 px-3 py-2 rounded text-center"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>
