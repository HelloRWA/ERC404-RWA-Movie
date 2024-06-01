<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
const { isLoading, doShowMint, tiers } = $(tokenStore());
</script>

<template>
  <div>
    <Loading :is-loading="isLoading" class="mx-auto max-w-md mt-10 grid gap-8 grid-cols-1 isolate lg:max-w-none lg:mx-0 lg:grid-cols-3">
      <div
        v-for="tier in tiers"
        :key="tier.name"
        :class="[tier.mostPopular ? 'bg-white/5 ring-2 ring-indigo-500' : 'ring-1 ring-white/10', 'rounded-3xl p-8 xl:p-10']"
      >
        <div class="flex gap-x-4 items-center justify-between">
          <h3 :id="tier.name" class="font-semibold text-lg text-white leading-8">{{ tier.name }}</h3>
          <p v-if="tier.mostPopular" class="rounded-full font-semibold bg-indigo-500 text-xs text-white py-1 px-2.5 leading-5">Most popular</p>
        </div>
        <p class="mt-4 text-sm text-gray-300 leading-6">{{ tier.description }}</p>
        <p class="flex mt-6 gap-x-1 items-baseline">
          <span class="font-bold text-white tracking-tight text-4xl">{{ humanFormatEther(tier.price) }}</span>
          <span class="font-semibold text-sm text-gray-300 leading-6">{{ tier.priceSuffix }}</span>
        </p>
        <button
          @click="doShowMint(tier.name)"
          :aria-describedby="tier.name"
          :class="[
            'w-full',
            tier.mostPopular
              ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
              : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
            'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          ]"
        >
          Mint
        </button>
        <ul role="list" class="space-y-3 mt-8 text-sm text-gray-300 leading-6 xl:mt-10">
          <li v-for="feature in tier.features" :key="feature" class="flex gap-x-3">
            <CheckIcon class="flex-none h-6 text-white w-5" aria-hidden="true" />
            {{ feature }}
          </li>
        </ul>
      </div>
    </Loading>
    <TokenMintModal />
  </div>
</template>
