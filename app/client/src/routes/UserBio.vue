<script setup>
import { inject } from "vue";

const user = inject("user");
</script>

<template>
  <div>{{ user && user.bio }}</div>
</template>
