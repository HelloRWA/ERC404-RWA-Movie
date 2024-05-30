<script setup lang="ts">
const { error, success, alertType, doCloseAlert, isShowAlert, isLoading } = $(notificationStore());
</script>

<template>
  <BsDialog :show="isShowAlert" @close="doCloseAlert" :isTopImportant="true">
    <div pt-2>
      <BsAlertError v-if="alertType === 'error'">
        {{ error }}
      </BsAlertError>
      <BsAlertSuccess v-if="alertType === 'success'" text-gray-9>
        {{ success }}
      </BsAlertSuccess>
      <button btn-primary w-full mt-6 @click="doCloseAlert" :isLoading="isLoading">OK</button>
    </div>
  </BsDialog>
</template>
