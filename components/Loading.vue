<script setup lang="ts">
const { isLoading, tb = false, text = "Loading..." } = $defineProps<{
  isLoading: boolean;
  text?: string;
  tb?: boolean;
}>();
</script>

<template>
  <div>
    <div v-if="isLoading" w-full h-full flex-cc py-20>
      <LoadingIcon mr-4 />
      <span :class="tb ? 'text-black' : 'text-white'">{{ text }}</span>
    </div>
    <slot v-else />
  </div>
</template>
