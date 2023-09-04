<script setup>
import { ref } from "vue";

const bio = ref("");

async function getBio() {
  const response = await fetch(`/social/users/${result.id}`);
  if (response.ok) {
    const result = await response.json();
    return result.bio;
  }
}
</script>

<template>
  <div>user bio</div>
</template>
