<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const users = ref([]);

async function getData() {
  const response = await fetch(`/api/social/followers/${route.params.userId}`);
  if (response.ok) {
    const results = await response.json();
    users.value = results.data;
  }
}
getData();
</script>

<template>
  <div v-for="user in users">
    {{ user }}
  </div>
</template>
