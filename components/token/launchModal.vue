<script setup lang="ts">
const show = defineProp("show");
const onClose = defineEmit("close");

const form = $ref({
  name: "Godzilla",
  sbtPrice: 10,
  ftPrice: 10,
  ftSwapAmount: 1000,
});
</script>

<template>
  <DialogModal :show="show" :title="$t('Launch Token')" @close="onClose">
    <div space-y-5>
      <div>
        <label for="name" class="font-medium text-sm text-white leading-6 block">Token name</label>
        <div class="mt-2">
          <input
            type="text"
            name="name"
            id="name"
            v-model="form.name"
            autocomplete="name"
            class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-full py-1.5 px-2 ring-1 ring-white/10 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label for="sbtPrice" class="font-medium text-sm text-white leading-6 block">SBT price</label>
        <div class="mt-2">
          <input
            type="number"
            name="sbtPrice"
            id="sbtPrice"
            v-model="form.sbtPrice"
            autocomplete="sbtPrice"
            class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-full py-1.5 px-2 ring-1 ring-white/10 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label for="ftPrice" class="font-medium text-sm text-white leading-6 block">Fungible token price</label>
        <div class="mt-2">
          <input
            type="number"
            name="ftPrice"
            id="ftPrice"
            v-model="form.ftPrice"
            autocomplete="ftPrice"
            class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-full py-1.5 px-2 ring-1 ring-white/10 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label for="ftSwapAmount" class="font-medium text-sm text-white leading-6 block">Non-Fungible token swap amount</label>
        <div class="mt-2">
          <input
            type="number"
            name="ftSwapAmount"
            id="ftSwapAmount"
            v-model="form.ftSwapAmount"
            autocomplete="ftSwapAmount"
            class="rounded-md bg-white/5 border-0 shadow-sm ring-inset text-white w-full py-1.5 px-2 ring-1 ring-white/10 block sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <button class="btn-primary">Submit</button>
    </template>
  </DialogModal>
</template>
