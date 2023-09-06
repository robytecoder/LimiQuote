<script setup>
import { ref } from "vue";
import { currentUser, updateAuthState } from "../store";

async function login(evt) {
  const submittedValues = Object.fromEntries(new FormData(evt.currentTarget));
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submittedValues),
  });
  console.log(res);
  if (res.ok) {
    signinError.value = null;
    updateAuthState();
  } else {
    let body = await res.json();
    signinError.value = body.errors;
  }
}

const signinError = ref(null);
</script>

<template>
  <form v-if="!currentUser" @submit.prevent="login">
    <input class="border" type="text" name="username" />
    <input class="border" type="password" name="password" />
    <button type="submit">Accedi</button>
    <div
      v-if="signinError"
      class="px-3 py-2 bg-red-300 border-red-500 text-red-700"
    >
      {{ signinError }}
    </div>
  </form>
</template>
