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
    {{ message.text }}
    {{ formatDate(message.date) }}
  </div>
</template>
