<script setup>
import { inject } from "vue";

const user = inject("user");
</script>

<template>
  <div>{{ user.bio }}</div>
</template>
