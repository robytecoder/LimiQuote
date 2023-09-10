<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { buttonPrimaryClasses, formatDate, formatUserName } from "../lib";
import axios from "axios";
import { currentUser } from "../store";

const props = defineProps({
  message: { type: Object },
});
const emit = defineEmits(["close", "changed"]);

async function like() {
  await axios.post(`/api/social/like/${props.message.id}`);
}

async function dislike() {
  await axios.delete(`/api/social/like/${props.message.id}`);
}

async function toggle() {
  if (props.message.didILike) {
    await dislike();
  } else {
    await like();
  }
  emit("changed");
}
</script>

<template>
  <div class="fixed inset-0 bg-black/75"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-8">
      <div
        class="w-full max-w-xl overflow-hidden bg-zinc-100 p-8 shadow-xl rounded-xl font-serif"
      >
        <div class="flex justify-end">
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
        <figure class="max-w-screen-md mx-auto">
          <blockquote>
            <p class="text-xl font-medium text-black text-center p-4">
              {{ message.text }}
            </p>
          </blockquote>
          <figcaption class="mt-6 space-x-3">
            <div class="flex flex-row">
              <div class="flex-1 grow text-left text-sm">
                {{ formatDate(message.date) }}
              </div>
              <div class="flex-1 text-center font-semibold">
                {{ formatUserName(message.author) }}
              </div>
              <div class="flex-1 text-right flex justify-end">
                <button
                  v-if="currentUser"
                  @click="toggle"
                  class="relative inline-flex items-center space-x-1"
                >
                  <span class="text-zinc-900">{{ message.likes }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5"
                    :class="
                      message.didILike
                        ? 'fill-red-500 stroke-red-500'
                        : 'fill-none stroke-gray-900'
                    "
                  >
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    />
                  </svg>
                </button>
                <span
                  v-else
                  class="relative inline-flex items-center space-x-1"
                >
                  <span class="font-semibold text-zinc-900">{{
                    message.likes
                  }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5"
                    :class="
                      message.didILike
                        ? 'fill-red-500 stroke-red-500'
                        : 'fill-none stroke-zinc-900'
                    "
                  >
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>
