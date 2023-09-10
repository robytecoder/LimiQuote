<script setup>
import { computed, ref } from "vue";
import { formatDate, formatUserName } from "../lib";
import MessageDetails from "./MessageDetails.vue";

const currentMessageId = ref(null);
const messages = ref([]);

async function getData() {
  const response = await fetch(`/api/social/feed`);
  if (response.ok) {
    const results = await response.json();
    messages.value = results.data;
  }
}
getData();

const currentMessage = computed(() =>
  currentMessageId !== null
    ? messages.value.find((msg) => msg.id == currentMessageId.value)
    : null
);
</script>

<template>
  <div
    v-for="message in messages"
    @click="currentMessageId = message.id"
    class="cursor-pointer"
  >
    <section
      class="bg-zinc-100 rounded-xl hover:bg-white font-serif my-4 px-8 py-8 mx-auto text-center"
    >
      <figure class="max-w-screen-md mx-auto">
        <blockquote>
          <p class="text-xl font-medium text-black line-clamp-3">
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
            <div class="flex-1 text-right">
              <span v-if="message.likes"
                >{{ message.likes }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 inline-block stroke-red-500"
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
    </section>
  </div>
  <MessageDetails
    :message="currentMessage"
    v-if="currentMessage"
    @changed="getData()"
    @close="currentMessageId = null"
  />
</template>
