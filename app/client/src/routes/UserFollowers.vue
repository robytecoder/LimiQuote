<script setup>
import { useRoute } from "vue-router";
import { ref, inject } from "vue";
import { formatUserName } from "../lib";

const users = inject("followers");
</script>

<template>
  <div v-for="user in users">
    {{ formatUserName(user) }}
  </div>
</template>
