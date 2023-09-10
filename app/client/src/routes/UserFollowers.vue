<script setup>
import { inject } from "vue";
import { formatUserName } from "../lib";

const users = inject("followers");
</script>

<template>
  <div class="mx-auto">
    <router-link
      :to="{ name: 'userMessages', params: { userId: follower.id } }"
      v-for="follower in users"
      class="flex justify-center rounded-xl hover:bg-white bg-zinc-100 font-semibold text-lg px-8 py-4 my-4"
    >
      {{ formatUserName(follower) }}
    </router-link>
  </div>
</template>
