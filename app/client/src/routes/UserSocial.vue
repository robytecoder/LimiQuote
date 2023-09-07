<script setup>
import { useRoute } from "vue-router";
import { provide, ref } from "vue";
import { currentUser } from "../store";
import {
  buttonPrimaryClasses,
  buttonSecondaryClasses,
  formatUserName,
} from "../lib";
import axios from "axios";

const route = useRoute();
const user = ref(null);
const followers = ref([]);

async function follow() {
  await axios.post(`/api/social/followers/${route.params.userId}`);
  getFollowers();
}

async function unfollow() {
  await axios.delete(`/api/social/followers/${route.params.userId}`);
  getFollowers();
}

async function getFollowers() {
  const response = await axios.get(
    `/api/social/followers/${route.params.userId}`
  );
  followers.value = response.data;
}

async function getData() {
  try {
    const response = await axios.get(
      `/api/social/users/${route.params.userId}`
    );
    user.value = response.data.data;
  } catch (error) {}
}

getData();
getFollowers();
provide("user", user);
provide("followers", followers);
</script>

<template>
  <div class="w-full max-w-3xl mx-auto pt-4">
    <div class="flex items-center justify-between">
      <h2 class="font-semibold text-3xl">{{ formatUserName(user) }}</h2>
      <button
        v-if="
          currentUser &&
          currentUser.id != $route.params.userId &&
          !followers.find((follower) => follower.id == currentUser.id)
        "
        :class="buttonPrimaryClasses"
        @click="follow"
      >
        Follow
      </button>
      <button
        v-if="
          currentUser &&
          currentUser.id != $route.params.userId &&
          followers.find((follower) => follower.id == currentUser.id)
        "
        :class="buttonSecondaryClasses"
        @click="unfollow"
      >
        Unfollow
      </button>
    </div>
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
