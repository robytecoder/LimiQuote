<script setup>
import { useRoute, useRouter } from "vue-router";
import { provide, ref } from "vue";
import { currentUser } from "../store";
import {
  buttonPrimaryClasses,
  buttonSecondaryClasses,
  formatUserName,
} from "../lib";
import axios from "axios";

const route = useRoute();
const router = useRouter();
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
  } catch (error) {
    console.log(error);
    if (error.response.status === 404) router.push({ name: "home" });
  }
}

getData();
getFollowers();
provide("user", user);
provide("followers", followers);
</script>

<template>
  <div v-if="!user"></div>
  <div v-else class="w-full max-w-3xl mx-auto px-4">
    <div
      v-if="currentUser && currentUser.id == $route.params.userId"
      class="flex justify-center py-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-user-circle-2"
      >
        <path d="M18 20a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      <h2 class="font-bold text-3xl pl-4">
        {{ formatUserName(user) }}
      </h2>
    </div>
    <div v-else class="flex items-center justify-between py-8">
      <div class="inline-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-circle-2"
        >
          <path d="M18 20a6 6 0 0 0-12 0" />
          <circle cx="12" cy="10" r="4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        <h2 class="font-bold text-3xl pl-4">
          {{ formatUserName(user) }}
        </h2>
      </div>
      <button
        v-if="
          currentUser &&
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
          followers.find((follower) => follower.id == currentUser.id)
        "
        :class="buttonSecondaryClasses"
        @click="unfollow"
      >
        Unfollow
      </button>
    </div>
    <div>
      <ul
        class="-mb-px flex items-center gap-4 font-normal border-b border-b-zinc-400"
      >
        <li class="flex-1">
          <router-link
            active-class="font-semibold border-b border-b-black border-b-4"
            class="flex items-center justify-center gap-2 px-1 py-1 text-black rounded-t-lg hover:bg-zinc-100"
            :to="{
              name: 'userMessages',
              params: { userId: $route.params.userId },
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-messages-square"
            >
              <path
                d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"
              />
              <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
            </svg>
            QUOTES
          </router-link>
        </li>
        <li class="flex-1">
          <router-link
            active-class="font-semibold border-b border-b-black border-b-4"
            class="flex items-center justify-center gap-2 px-1 py-1 text-black rounded-t-lg hover:bg-zinc-100"
            :to="{
              name: 'userBio',
              params: { userId: $route.params.userId },
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-text"
            >
              <path d="M17 6.1H3" />
              <path d="M21 12.1H3" />
              <path d="M15.1 18H3" />
            </svg>
            BIO
          </router-link>
        </li>
        <li class="flex-1">
          <router-link
            active-class="font-semibold border-b border-b-black border-b-4"
            class="flex items-center justify-center gap-2 px-1 py-1 text-black rounded-t-lg hover:bg-zinc-100"
            :to="{
              name: 'userFollowers',
              params: { userId: $route.params.userId },
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-users-2"
            >
              <path d="M14 19a6 6 0 0 0-12 0" />
              <circle cx="8" cy="9" r="4" />
              <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
            </svg>
            FOLLOWERS
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
