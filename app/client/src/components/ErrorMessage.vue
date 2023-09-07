<script setup>
defineProps({ message: { type: String } });
</script>

<template>
  <div class="bg-red-300 text-center p-4 text-red-600">
    {{ message }}
  </div>
</template>
