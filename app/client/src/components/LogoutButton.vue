<script setup>
import { user, updateAuthState } from "../store";

async function logout() {
  const res = await fetch("/api/auth/signout", {
    method: "POST",
  });
  console.log(res);
  if (res.ok) {
    updateAuthState();
  }
  //   let body = await res.json();
  //   console.log(body);
}
</script>

<template>
  <div @click="logout()">
    <button v-if="user">Logout</button>
  </div>
</template>
