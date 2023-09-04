<script setup />

<template>
  <div>
    <div>Roberto Baggio</div>
    <ul class="flex">
      <li>
        <router-link class="px-2" :to="`/social/users/${$route.params.userId}`"
          >Bio</router-link
        >
      </li>
      <li>
        <router-link
          class="px-2"
          :to="`/social/messages/${$route.params.userId}`"
          >Quotes</router-link
        >
      </li>
      <li>
        <router-link
          class="px-2"
          :to="`/social/followers/${$route.params.userId}`"
          >Followers</router-link
        >
      </li>
      <li>
        <router-link
          class="px-2"
          :to="`/social/followed/${$route.params.userId}`"
          >Followed</router-link
        >
      </li>
    </ul>
    <router-view />
  </div>
</template>
