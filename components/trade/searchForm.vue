<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <div class="border-b flex bg-gray-900 border-white/5 h-16 shadow-sm px-4 top-0 z-40 gap-x-6 sticky items-center shrink-0 sm:px-6 lg:px-8">
    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form class="flex flex-1" action="#" method="GET">
        <label for="search-field" class="sr-only">Search market</label>
        <div class="w-full relative">
          <MagnifyingGlassIcon class="h-full inset-y-0 left-0 text-gray-500 w-5 pointer-events-none absolute" aria-hidden="true" />
          <input
            id="search-field"
            class="bg-transparent h-full border-0 text-white w-full py-0 pr-0 pl-8 block sm:text-sm focus:ring-0"
            placeholder="Search Market..."
            type="search"
            name="search"
          />
        </div>
      </form>
    </div>
  </div>
</template>
