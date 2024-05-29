<script setup lang="ts">
const stats = [
  { id: 1, name: "TVL", value: "4.56M" },
  { id: 2, name: "NFT Holders", value: "3.32k" },
  { id: 3, name: "FT Holders", value: "2.56k" },
  { id: 4, name: "SBT Sold", value: "1.23M" },
];

let { isShow } = $(tokenLaunchStore());
</script>

<template>
  <div class="rounded-xl h-full bg-gray-900 py-12 sm:py-16">
    <div class="h-full mx-auto max-w-7xl px-6 lg:px-8">
      <div class="flex flex-col mx-auto max-w-2xl lg:max-w-none">
        <div class="text-center">
          <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">Token / NFT Stats</h2>
          <!-- <p class="mt-4 text-lg text-gray-300 leading-8">Lorem ipsum dolor sit amet consect adipisicing possimus.</p> -->
        </div>
        <dl class="rounded-2xl mt-16 text-center grid gap-0.5 grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-white/5 p-8">
            <dt class="font-semibold text-sm text-gray-300 leading-6">{{ stat.name }}</dt>
            <dd class="order-first font-semibold text-white tracking-tight text-3xl">{{ stat.value }}</dd>
          </div>
        </dl>
        <div py-5 flex-cc>
          <div pt-10 text-center flex flex-col items-center>
            <h3 text-2xl mb-5>Token is not launched yet.</h3>
            <button flex="~ gap2" items-center p="x6 y3" bg="gray/15 hover:gray/20" transition :title="$t('Launch Token')" @click="isShow = true">
              <div i-heroicons-rocket-launch-16-solid />
              {{ $t("Launch Token") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <TokenLaunchModal />
  </div>
</template>
