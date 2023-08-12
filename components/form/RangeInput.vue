<script setup lang="ts">
import { useField } from 'vee-validate';
import { twMerge } from 'tailwind-merge'

const props = defineProps<{ class?: string, value?: number, name: string, label: string, min: number, max: number, step: number }>();

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
            {{ props.label }}: {{ inputValue }}
        </label>
        <input :step="props.step" :min="props.min" :max="props.max" :name="name" :id="name" type="range" :value="inputValue"
            @input="handleChange" @blur="handleBlur">
        <p v-if="errorMessage" class="text-xs italic text-red-500">{{ errorMessage }}</p>
    </div>
</template>