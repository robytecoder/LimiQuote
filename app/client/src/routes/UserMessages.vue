<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { formatDate } from "../lib";

const route = useRoute();
const messages = ref([]);

async function getData() {
  const response = await fetch(`/api/social/messages/${route.params.userId}`);
  if (response.ok) {
    const results = await response.json();
    messages.value = results.data;
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
        <figcaption class="flex items-center justify-center mt-4 space-x-3">
          <div class="flex items-center divide-x-2 divide-black">
            <div class="pr-3 font-medium text-black">Autore</div>
            <div class="pl-3 text-sm font-light text-black">
              {{ formatDate(message.date) }}
            </div>
          </div>
        </figcaption>
      </figure>
    </section>
  </div>
</template>
