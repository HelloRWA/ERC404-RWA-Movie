<script setup lang="ts">
interface Props {
  isLoading: boolean;
  tb?: boolean;
  text?: String;
}
let { isLoading, tb = false, text = "Loading..." } = defineProps<Props>();
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
