<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

const { show, title } = $defineProps<{
  show: boolean;
  title: string;
}>();

const onClose = defineEmit("close");
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog class="z-10 relative" @close="onClose">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="bg-gray-500 bg-opacity-75 inset-0 transition-opacity fixed" />
      </TransitionChild>

      <div class="w-screen inset-0 z-10 fixed overflow-y-auto">
        <div class="flex min-h-full text-center p-4 items-end justify-center sm:p-0 sm:items-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="rounded-lg bg-gray-700 shadow-xl text-left w-full transform px-4 pt-5 pb-4 transition-all relative overflow-hidden sm:max-w-sm sm:my-8 sm:p-6"
            >
              <slot name="title">
                <DialogTitle as="h3" class="font-semibold text-center text-base text-white leading-6">{{ title }}</DialogTitle>
              </slot>

              <div class="mt-4">
                <slot></slot>
              </div>
              <slot name="footer"> </slot>
              <!-- <div class="mt-5 sm:mt-6"></div> -->
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
