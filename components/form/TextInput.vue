<script setup lang="ts">
import { useField } from 'vee-validate';
import { twMerge } from 'tailwind-merge'

const props = defineProps<{ class?: string, type: string, value?: string, name: string, label: string, placeholder: string, step?: number }>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

</script>

<template>
  <div :class="props.class">
    <label class="block mb-2 text-sm font-bold text-gray-700" :for="props.name">
      {{ props.label }}
    </label>
    <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" :step="step"
      @input="handleChange" @blur="handleBlur"
      :class="twMerge('w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-slate-400 rounded shadow appearance-none focus:outline-none focus:shadow-outline', errorMessage && 'border-red-500')">
    <p v-if="errorMessage" class="text-xs italic text-red-500">{{ errorMessage }}</p>
  </div>
</template>