<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { formatDate } from "../lib";

const route = useRoute();
const messages = ref([]);

async function getData() {
  const response = await fetch(`/api/social/feed`);
  //
  if (response.ok) {
    const results = await response.json();
    messages.value = results.data;
    // for (let message in messages) {
    //   const author = await fetch(`/api/social/messages/{message.userId}`);
    //   if (author.ok) {
    //     const result = await author.json();
    //     message. = result.data;
    //   }
    // }
  }
}
getData();
</script>

<template>
  <div v-for="message in messages">
    <section
      class="bg-zinc-100 rounded-xl hover:bg-white font-serif my-4 px-8 py-8 mx-auto text-center"
    >
      <figure class="max-w-screen-md mx-auto">
        <blockquote>
          <p class="text-xl font-medium text-black">
            {{ message.text }}
          </p>
        </blockquote>
        <figcaption class="mt-6 space-x-3">
          <div class="flex flex-row">
            <div class="flex-1 grow text-left text-sm">
              {{ formatDate(message.date) }}
            </div>
            <div class="flex-1 text-center font-semibold">
              User {{ message.userId }}
            </div>
            <div class="flex-1 text-right">Likes</div>
          </div>
        </figcaption>
      </figure>
    </section>
  </div>
</template>
