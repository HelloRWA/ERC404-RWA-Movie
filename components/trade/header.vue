<script setup lang="ts">
const secondaryNavigation = [
  { name: "Overview", href: "#", current: true },
  { name: "Trending", href: "#", current: false },
  { name: "Top", href: "#", current: false },
  { name: "Movie", href: "#", current: false },
  { name: "TV", href: "#", current: false },
  { name: "Person", href: "#", current: false },
];
const stats = [
  { name: "Number of deploys", value: "405" },
  { name: "Average deploy time", value: "3.65", unit: "mins" },
  { name: "Number of servers", value: "3" },
  { name: "Success rate", value: "98.5%" },
];
</script>

<template>
  <header>
    <nav class="border-b flex border-white/10 py-4 overflow-x-auto">
      <ul role="list" class="flex flex-none font-semibold min-w-full text-sm px-4 text-gray-400 leading-6 gap-x-6 sm:px-6 lg:px-8">
        <li v-for="item in secondaryNavigation" :key="item.name">
          <a :href="item.href" :class="item.current ? 'text-indigo-400' : ''">{{ item.name }}</a>
        </li>
      </ul>
    </nav>

    <!-- Stats -->
    <div class="bg-gray-700/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(stat, statIdx) in stats"
        :key="stat.name"
        :class="[statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '', 'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8']"
      >
        <p class="font-medium text-sm text-gray-400 leading-6">{{ stat.name }}</p>
        <p class="flex mt-2 gap-x-2 items-baseline">
          <span class="font-semibold text-white tracking-tight text-4xl">{{ stat.value }}</span>
          <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
        </p>
      </div>
    </div>
  </header>
</template>
