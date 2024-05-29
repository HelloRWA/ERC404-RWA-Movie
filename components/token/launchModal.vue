<script setup lang="ts">
const show = defineProp("show");
const onClose = defineEmit("close");
</script>

<template>
  <DialogModal :show="show" :title="$t('Launch Token')" @close="onClose">
    <div>hehe</div>
  </DialogModal>
</template>
