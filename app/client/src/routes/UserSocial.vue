<script setup>
import { useRoute } from "vue-router";
import { provide, ref } from "vue";
import { formatUserName } from "../lib";

const route = useRoute();
const user = ref(null);

async function getData() {
  const response = await fetch(`/api/social/users/${route.params.userId}`);
  if (response.ok) {
    const result = await response.json();
    user.value = result.data;
  }
}
getData();

provide("user", user);
</script>

<template>
  <div>
    <div>{{ formatUserName(user) }}</div>
    <ul class="flex">
      <li>
        <router-link
          active-class="font-bold"
          class="px-2"
          :to="{ name: 'userBio', params: { userId: $route.params.userId } }"
          >Bio</router-link
        >
      </li>
      <li>
        <router-link
          active-class="font-bold"
          class="px-2"
          :to="{
            name: 'userMessages',
            params: { userId: $route.params.userId },
          }"
          >Quotes</router-link
        >
      </li>
      <li>
        <router-link
          active-class="font-bold"
          class="px-2"
          :to="{
            name: 'userFollowers',
            params: { userId: $route.params.userId },
          }"
          >Followers</router-link
        >
      </li>
      <li>
        <router-link
          active-class="font-bold"
          class="px-2"
          :to="{
            name: 'userFollowed',
            params: { userId: $route.params.userId },
          }"
          >Followed</router-link
        >
      </li>
    </ul>
    <router-view />
  </div>
</template>
