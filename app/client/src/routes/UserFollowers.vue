<script setup>
import { useRoute } from "vue-router";
import { ref, inject } from "vue";
import { formatUserName } from "../lib";
// import { currentUser } from "../store";

const users = inject("followers");
// const followers = ref([]);

// async function follow() {
//   await axios.post(`/api/social/followers/${route.params.userId}`);
//   getFollowers();
// }

// async function unfollow() {
//   await axios.delete(`/api/social/followers/${route.params.userId}`);
//   getFollowers();
// }

// async function getFollowers() {
//   const response = await axios.get(
//     `/api/social/followers/${route.params.userId}`
//   );
//   followers.value = response.data;
// }
// getFollowers();
</script>

<template>
  <div class="mx-auto">
    <div
      v-for="user in users"
      class="rounded-xl hover:bg-white bg-zinc-100 font-semibold text-lg px-8 py-4 my-4"
    >
      <div>
        {{ formatUserName(user) }}
      </div>
      <!-- <button
        v-if="!users.find((user) => user.id == currentUser.id)"
        :class="buttonPrimaryClasses"
        @click="follow"
      >
        Follow
      </button>
      <button
        v-if="users.find((user) => user.id == currentUser.id)"
        :class="buttonSecondaryClasses"
        @click="unfollow"
      >
        Unfollow
      </button> -->
    </div>
  </div>
</template>
