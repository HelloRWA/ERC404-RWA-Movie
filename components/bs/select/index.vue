<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

interface Props {
  modelValue: string | number;
  list: Array<string>;
  hasAddNew?: boolean;
  isDark?: boolean;
}
let { modelValue, list, hasAddNew = false, isDark = false } = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const value = $computed({
  get() {
    return modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

let showAddModal = $ref(false);
let newOptionName = $ref("");
const addNewOption = () => {
  list.push(newOptionName);
  emit("update:modelValue", newOptionName);
  newOptionName = "";
  showAddModal = false;
};
</script>

<template>
  <Listbox v-model="value" as="div">
    <div class="relative">
      <div flex items-center>
        <ListboxButton
          :class="isDark ? '' : 'bg-white'"
          class="rounded-md cursor-default ring-inset text-left w-full py-1.5 pr-10 pl-3 ring-1 ring-gray-3 relative sm:text-sm sm:leading-6 focus:ring-2"
        >
          <span class="block" :class="isDark ? 'text-white' : 'text-gray-6'">{{ modelValue }}</span>
          <span class="flex pr-2 inset-y-0 right-0 pointer-events-none absolute items-center">
            <ChevronUpDownIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
          </span>
        </ListboxButton>
        <button v-if="hasAddNew" py-1 @click="showAddModal = true">
          <span i-heroicons-outline-plus-circle w-5 h-5>Add new</span>
        </button>
      </div>
      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions
          class="bg-white rounded-md shadow-lg ring-black mt-1 text-base w-full max-h-60 py-1 ring-1 ring-opacity-5 z-10 absolute overflow-auto sm:text-sm focus:outline-none"
        >
          <ListboxOption v-for="item in list" :key="item" v-slot="{ active, selected }" as="template" :value="item">
            <li class="cursor-pointer w-full py-2 pr-9 pl-3 relative select-none" :class="[active ? 'bg-gray-700 text-white' : 'text-gray-900']">
              <span class="block" :class="[selected ? 'font-semibold' : 'font-normal']">{{ item }}</span>
              <span v-if="selected" class="flex pr-4 inset-y-0 right-0 absolute items-center" :class="[active ? 'text-white' : 'text-gray-700']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <!-- <BsDialog :show="showAddModal" @close="showAddModal = false">
      <h3 mb-2 font-bold>Create a new option</h3>
      <div w-sm flex>
        <input
          v-model="newOptionName"
          type="text"
          class="rounded-md max-w-lg border-0 shadow-sm ring-inset w-full py-1.5 px-2 ring-1 ring-gray-300 text-gray-900 block placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:ring-inset focus:ring-2"
          placeholder="input your new select option name"
        />
        <button btn-primary ml-2 @click="addNewOption">Save</button>
      </div>
    </BsDialog> -->
  </Listbox>
</template>
