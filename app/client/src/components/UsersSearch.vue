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

// function onSearchChange(evt) {
// 	const searchString = evt.target.value.toLowerCase()
// 	if (searchString.length >= 1) {
// 		searchFromAPI(searchString)
// 	} else {
// 		searchResults.value = []
// 	}
// }

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
    <!-- <div v-if="!currentUser">
			<label class="text-xs">Search</label>
			<input
				class="block shadow-sm rounded-sm border-gray-200 border px-3 py-2 w-80"
				type="text"
				@keyup="onSearchChange"
			/>
		</div> -->
    <div>
      <input
        class="block shadow-sm border-gray-200 border px-3 py-0.5 w-60 text-sm"
        type="text"
        v-model="query"
        @focus="searchResults.length ? (showResults = true) : null"
      />
      <!-- @keyup="onSearchChange" -->
    </div>
    <div v-if="showResults" class="bg-zinc-800 relative">
      <ul class="absolute bg-white shadow-lg rounded w-full top-2">
        <li
          class="px-4 py-2 hover:bg-black hover:text-white"
          v-for="result in searchResults"
          :key="result"
        >
          <!-- :to="`/social/users/${result.id}`" -->
          <router-link
            :to="{ name: 'userBio', params: { userId: result.id } }"
            @click="(showResults = false), (query = '')"
            >{{ result.name }} {{ result.surname }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
