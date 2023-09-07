<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { currentUser, updateAuthState } from "../store";
import ErrorMessage from "../components/ErrorMessage.vue";

const router = useRouter();

async function signIn(evt) {
  try {
    const data = Object.fromEntries(new FormData(evt.currentTarget));
    const res = await axios.post("/api/auth/signup", data);
    signinError.value = null;
    updateAuthState();
    router.push({ name: "signin" });
  } catch (error) {
    console.error(error);
    signinError.value =
      error?.response?.data?.errors ?? "An unknown error occurred";
  }
}

const signinError = ref(null);
</script>

<template>
  <div class="flex flex-1 flex-col justify-center px-12 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=zinc&shade=600" alt="Your Company" /> -->
      <h2
        class="mt-10 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900"
      >
        Sign up
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="signIn">
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

        <div>
          <label for="email" class="block font-semibold leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="email" class="block font-semibold leading-6 text-gray-900"
            >Surname</label
          >
          <div class="mt-2">
            <input
              id="surname"
              name="surname"
              type="text"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="bio" class="block font-semibold leading-6 text-gray-900"
            >Bio</label
          >
          <div class="mt-2">
            <textarea
              id="bio"
              name="bio"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-black">
        Already a member?
        {{ " " }}
        <router-link
          :to="{ name: 'signin' }"
          class="px-2 font-semibold leading-6 text-black text-lg hover:text-zinc-800"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
  <!-- <ErrorMessage v-if="signinError" :message="signinError.join(', ')" /> -->
</template>
