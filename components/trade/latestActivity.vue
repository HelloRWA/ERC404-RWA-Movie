<script setup lang="ts">
const statuses = { Completed: "text-green-400 bg-green-400/10", Error: "text-rose-400 bg-rose-400/10" };
const activityItems = [
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  {
    user: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commit: "2d89f0c8",
    branch: "main",
    status: "Completed",
    duration: "25s",
    date: "45 minutes ago",
    dateTime: "2023-01-23T11:00",
  },
  // More items...
];
</script>

<template>
  <div class="border-t border-white/10 pt-11">
    <h2 class="font-semibold text-base text-white px-4 leading-7 sm:px-6 lg:px-8">Latest activity</h2>
    <table class="mt-6 text-left w-full whitespace-nowrap">
      <colgroup>
        <col class="w-full sm:w-4/12" />
        <col class="lg:w-4/12" />
        <col class="lg:w-2/12" />
        <col class="lg:w-1/12" />
        <col class="lg:w-1/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm text-white leading-6">
        <tr>
          <th scope="col" class="font-semibold py-2 pr-8 pl-4 sm:pl-6 lg:pl-8">User</th>
          <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden sm:table-cell">Commit</th>
          <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 sm:text-left sm:pr-8 lg:pr-20">Status</th>
          <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden md:table-cell lg:pr-20">Duration</th>
          <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 hidden sm:pr-6 sm:table-cell lg:pr-8">Deployed at</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="item in activityItems" :key="item.commit">
          <td class="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
            <div class="flex gap-x-4 items-center">
              <img :src="item.user.imageUrl" alt="" class="rounded-full bg-gray-800 h-8 w-8" />
              <div class="font-medium text-sm text-white leading-6 truncate">{{ item.user.name }}</div>
            </div>
          </td>
          <td class="py-4 pr-4 pl-0 hidden sm:pr-8 sm:table-cell">
            <div class="flex gap-x-3">
              <div class="font-mono text-sm text-gray-400 leading-6">{{ item.commit }}</div>
              <span
                class="rounded-md font-medium bg-gray-400/10 ring-inset text-xs py-1 px-2 ring-1 ring-gray-400/20 text-gray-400 inline-flex items-center"
                >{{ item.branch }}</span
              >
            </div>
          </td>
          <td class="text-sm py-4 pr-4 pl-0 leading-6 sm:pr-8 lg:pr-20">
            <div class="flex gap-x-2 items-center justify-end sm:justify-start">
              <time class="text-gray-400 sm:hidden" :datetime="item.dateTime">{{ item.date }}</time>
              <div :class="[statuses[item.status], 'flex-none rounded-full p-1']">
                <div class="bg-current rounded-full h-1.5 w-1.5" />
              </div>
              <div class="text-white hidden sm:block">{{ item.status }}</div>
            </div>
          </td>
          <td class="text-sm py-4 pr-8 pl-0 text-gray-400 leading-6 hidden md:table-cell lg:pr-20">{{ item.duration }}</td>
          <td class="text-right text-sm py-4 pr-4 pl-0 text-gray-400 leading-6 hidden sm:pr-6 sm:table-cell lg:pr-8">
            <time :datetime="item.dateTime">{{ item.date }}</time>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
