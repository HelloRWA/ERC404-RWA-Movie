<script setup lang="ts">
const { isLoading, isShow, tokenId, tokenStats } = $(tokenStore());

const stats = $computed(() => {
  const tvl = (tokenStats.ftAmount + tokenStats.nftAmount * tokenStats.ftSwapAmount) * tokenStats.ftPrice + tokenStats.sbtSold;
  return [
    { id: 1, name: "TVL ($BST)", value: humanFormatEther(tvl || "0") },
    { id: 2, name: "NFT Holders", value: tokenStats.nftHolderCount },
    { id: 3, name: "FT Holders", value: tokenStats.ftHolderCount },
    { id: 4, name: "SBT Income ($BST)", value: humanFormatEther(tokenStats.sbtSold) },
  ];
});
</script>

<template>
  <div>
    <Loading :is-loading="isLoading" class="flex-col flex h-full mx-auto max-w-2xl lg:max-w-none">
      <div v-if="!tokenId" class="flex flex-col bg-white/5 rounded-2xl text-center py-10 items-center">
        <h3 text-2xl mb-5>Token is not launched yet.</h3>
        <button flex="~ gap2" items-center p="x6 y3" bg="gray/15 hover:gray/20" transition :title="$t('Launch Token')" @click="isShow = true">
          <div i-heroicons-rocket-launch-16-solid />
          {{ $t("Launch Token") }}
        </button>
      </div>
      <div v-else>
        <h2 text-3xl mb4>
          {{ $t("Token Stats") }}
        </h2>
        <dl class="rounded-2xl text-center grid gap-0.5 grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.id" class="flex flex-col bg-white/5 p-8">
            <dt class="font-semibold text-sm text-gray-300 leading-6">{{ stat.name }}</dt>
            <dd class="order-first font-semibold text-white tracking-tight text-3xl">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>
    </Loading>
    <TokenLaunchModal />
  </div>
</template>
