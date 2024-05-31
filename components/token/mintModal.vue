<script setup lang="ts">
const { isShowMint, doSubmit, isLoading, tierNameList, mintTier, tokenPrice, mintAmount, payAmount, doSubmitMint } = $(tokenStore());
</script>

<template>
  <BsDialog :show="isShowMint" :title="$t('Mint Token')" @close="isShowMint = false">
    <Loading :is-loading="isLoading" space-y-5 py-5>
      <div flex-bc>
        <div text-gray-4>Token type</div>
        <div class="w-50"><BsSelect v-model="mintTier" :list="tierNameList" :is-dark="true" /></div>
      </div>

      <div flex-bc>
        <div text-gray-4>Token price</div>
        <div>{{ formatEther(tokenPrice) }} $BST</div>
      </div>
      <div flex-bc>
        <div text-gray-4>Mint amount</div>
        <div flex justify-end>
          <input
            v-if="mintTier === 'Fungible Token'"
            type="number"
            name="ftSwapAmount"
            id="ftSwapAmount"
            v-model="mintAmount"
            autocomplete="ftSwapAmount"
            class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white py-1.5 px-2 ring-1 ring-white/10 w-1/2 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
          />
          <div v-else>
            {{ mintAmount }}
          </div>
        </div>
      </div>
      <div flex-bc>
        <div text-gray-4>Pay amount</div>
        <div>{{ formatEther(payAmount) }} $BST</div>
      </div>

      <button class="btn-primary" @click="doSubmitMint">{{ $t("Submit") }}</button>
    </Loading>
  </BsDialog>
</template>
