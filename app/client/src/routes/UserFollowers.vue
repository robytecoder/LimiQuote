<script setup>
import { useRoute } from "vue-router";
import { ref, inject } from "vue";
import { formatUserName } from "../lib";

// const route = useRoute();
// const users = ref([]);

// async function getData() {
//   const response = await fetch(`/api/social/followers/${route.params.userId}`);
//   if (response.ok) {
//     const results = await response.json();
//     users.value = results.data;
//   }
// }
// getData();

const users = inject("followers");
</script>

<template>
  <div v-for="user in users">
    {{ formatUserName(user) }}
  </div>
</template>
