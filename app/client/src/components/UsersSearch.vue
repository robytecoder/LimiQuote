<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, watchEffect } from "vue";
import { currentUser } from "../store";

const query = ref("");
const searchResults = ref([]);

async function searchFromAPI(searchString) {
  const response = await fetch(`/api/social/search?q=${searchString}`);
  if (response.ok) {
    const results = await response.json();
    searchResults.value = results;
    if (results.length > 0) showResults.value = true;
  }
}

watchEffect(() => {
  if (query.value.length >= 1) {
    searchFromAPI(query.value);
  } else {
    searchResults.value = [];
  }
});

const showResults = ref(false);
const searchContainer = ref(null);
onClickOutside(searchContainer, () => {
  showResults.value = false;
});
</script>

<template>
  <div class="text-black" ref="searchContainer">
    <div>
      <input
        class="block shadow-sm border-gray-200 border px-3 py-0.5 w-50 text-sm focus:border-slate-400 focus:outline-none focus:ring-0"
        placeholder="Search users"
        type="text"
        v-model="query"
        @focus="searchResults.length ? (showResults = true) : null"
      />
    </div>
    <div v-if="showResults" class="bg-zinc-800 relative">
      <ul class="absolute bg-white shadow-lg rounded w-full top-2">
        <li v-for="result in searchResults" :key="result">
          <router-link
            class="w-full min-w-full block px-4 py-2 hover:bg-black hover:text-white"
            :to="{ name: 'userMessages', params: { userId: result.id } }"
            @click="(showResults = false), (query = '')"
            >{{ result.name }} {{ result.surname }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
