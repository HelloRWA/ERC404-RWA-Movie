<script setup lang="ts">
import type { Media, MediaType, TabType } from "~/types";

defineProps<{
  item: Media;
  type: MediaType;
  tab: TabType;
}>();

// const tab = ref<"overview" | "videos" | "photos">("overview");
</script>

<template>
  <div flex items-center justify-center gap8 py6>
    <NuxtLink n-tab :class="{ 'n-tab-active': tab === 'overview' }" :to="`/${type}/${item.id}/`">
      {{ $t("Overview") }}
    </NuxtLink>
    <NuxtLink n-tab :class="{ 'n-tab-active': tab === 'videos' }" :to="`/${type}/${item.id}/videos`">
      {{ $t("Videos") }}
    </NuxtLink>
    <NuxtLink n-tab :class="{ 'n-tab-active': tab === 'photos' }" :to="`/${type}/${item.id}/photos`">
      {{ $t("Media Photos") }}
    </NuxtLink>
  </div>
  <MediaOverview v-if="tab === 'overview'" :item="item" :type="type" />
  <MediaVideos v-if="tab === 'videos'" :item="item" />
  <MediaPhotos v-if="tab === 'photos'" :item="item" />
</template>
