<script setup>
import { currentUser } from "../store";
import { ref } from "vue";
import { buttonPrimaryClasses } from "../lib";
import NewMessage from "../components/NewMessage.vue";
import UserFeed from "../components/UserFeed.vue";

const isOpen = ref(false);
</script>

<template>
  <div v-if="currentUser" class="w-full max-w-3xl mx-auto px-4">
    <div class="flex flex-row-reverse pt-8 pb-4">
      <button
        @click="isOpen = true"
        type="button"
        :class="buttonPrimaryClasses"
      >
        <span class="px-1">New Quote</span>
        <div class="pl-2">
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
            class="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
    </div>
    <NewMessage :isOpen="isOpen" @close="isOpen = false" />
    <UserFeed />
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <h1 class="p-10 text-8xl font-semibold">LimiQuote</h1>
    <h2 class="p-10 text-3xl font-semibold text-center">
      Express Yourself through Quotes on our Social Platform.
    </h2>
  </div>
</template>
