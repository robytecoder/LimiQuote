<script setup>
import { inject } from "vue";

const user = inject("user");
</script>

<template>
  <p class="text-xl font-medium font-serif px-8 py-8 mx-auto">
    {{ user && user.bio }}
  </p>
</template>
