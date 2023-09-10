<script setup>
import { ref } from "vue";
import axios from "axios";
import { buttonPrimaryClasses } from "../lib";
import { currentUser, updateAuthState } from "../store";
import { useRouter } from "vue-router";

async function signIn(evt) {
  try {
    const data = Object.fromEntries(new FormData(evt.currentTarget));
    const res = await axios.post("/api/auth/signin", data);
    console.log(res);
    signinError.value = null;
    updateAuthState();
    router.push({ name: "home" });
  } catch (error) {
    signinError.value = error.response.data.errors;
  }
}

const signinError = ref(null);

const router = useRouter();
</script>

<template>
  <div class="flex flex-1 flex-col justify-center px-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="py-8 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-4" @submit.prevent="signIn">
        <div>
          <label for="email" class="block font-semibold leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="username"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block font-semibold leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="flex justify-center py-4">
          <button type="submit" :class="buttonPrimaryClasses">Sign in</button>
        </div>
      </form>
      <p class="pb-4 text-center text-sm text-black">
        Not a member?
        <router-link
          :to="{ name: 'signup' }"
          class="px-2 font-semibold leading-6 text-black text-lg hover:text-zinc-800"
          >Sign up</router-link
        >
      </p>
    </div>
  </div>
</template>
