<script setup lang="ts">
import { useField } from 'vee-validate';
import { twMerge } from 'tailwind-merge'

const props = defineProps<{ class?: string, minValue?: number, maxValue?: number, minName: string, maxName: string, label: string, min: number, max: number, step: number, minGap: number }>();

const minName = toRef(props, 'minName');
const maxName = toRef(props, 'maxName');

const {
    value: minInputValue,
    errorMessage,
    setValue: minSetValue,
    handleBlur: minHandleBlur,
    handleChange: minHandleChange,
} = useField(minName, undefined, { initialValue: props.min });


const {
    value: maxInputValue,
    // errorMessage,
    setValue: maxSetValue,
    handleBlur: maxHandleBlur,
    handleChange: maxHandleChange,
} = useField(maxName, undefined, { initialValue: props.max });

const sliderMin = ref();
const sliderMax = ref();
const sliderTrack = ref<HTMLDivElement>();

const styleLine = computed(() => ({
    left: `${(minInputValue.value || 0) / props.max * 100}%`,
    width: `${((maxInputValue.value || 0) - (minInputValue.value || 0)) / props.max * 100}%`
}));

function slideMin(e: unknown) {
    minHandleChange(e);
    if (parseInt(sliderMax.value.value) - parseInt(sliderMin.value.value) <= props.minGap) {
        minSetValue(parseInt(sliderMax.value.value) - props.minGap);
    }
}
function slideMax(e: unknown) {
    maxHandleChange(e);
    if (parseInt(sliderMax.value.value) - parseInt(sliderMin.value.value) <= props.minGap) {
        maxSetValue(parseInt(sliderMin.value.value) + props.minGap);
    }
}

function inputMin(e: FocusEvent) {
    const value = parseInt((e.target as HTMLInputElement).value);

    if (!value || value > maxInputValue.value) return;

    minSetValue(value || 0);
}

function inputMax(e: FocusEvent) {
    const value = parseInt((e.target as HTMLInputElement).value);

    if (!value || value < minInputValue.value) return;

    minSetValue(value || 0);
}



</script>

<template>
    <label class="block mb-2 text-sm font-bold text-gray-700" :for="props.minName">{{ props.label }}</label>
    <div class="relative py-4">
        <div ref="sliderTrack" :style=styleLine class="absolute w-full h-1 bg-blue-600"></div>
        <div class="absolute w-full h-1 bg-gray-300 rounded -z-10"></div>
        <input ref="sliderMin"
            :class="twMerge('absolute top-0 bottom-0 left-0 w-full bg-transparent appearance-none pointer-events-none', minInputValue > (max / 2) && 'z-10')"
            type="range" :min="0" :max="props.max" :value="minInputValue" @input="slideMin" @blur="minHandleBlur"
            :id="minName">
        <input ref="sliderMax"
            class="absolute top-0 bottom-0 left-0 w-full bg-transparent appearance-none pointer-events-none" type="range"
            :min="0" :max="props.max" :id="maxName" :value="maxInputValue" @input="slideMax" @blur="maxHandleBlur">
    </div>
    <div class="flex gap-4 mt-2">
        <div class="relative">
            <span class="absolute text-sm -translate-y-1/2 pointer-events-none left-2 top-1/2 text-slate-400">from:</span>
            <input class="w-full px-4 py-2 pl-12 border rounded border-slate-400" type="number" :value="minInputValue"
                @blur="inputMin" />
        </div>
        <div class="relative">
            <span class="absolute text-sm -translate-y-1/2 pointer-events-none left-2 top-1/2 text-slate-400">to:</span>
            <input class="w-full px-4 py-2 pl-12 border rounded border-slate-400" type="number" :value="maxInputValue"
                @blur="inputMax" />
        </div>
    </div>
</template>

<style scoped>
input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background-color: transparent;
    pointer-events: none;
}


input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
}

input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
}

input[type="range"]::-ms-track {
    appearance: none;
    height: 5px;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    background-color: #3264fe;
    cursor: pointer;
    margin-top: -9px;
    pointer-events: auto;
    border-radius: 50%;
}

input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    cursor: pointer;
    border-radius: 50%;
    background-color: #3264fe;
    pointer-events: auto;
    border: none;
}

input[type="range"]::-ms-thumb {
    appearance: none;
    height: 1.7em;
    width: 1.7em;
    cursor: pointer;
    border-radius: 50%;
    background-color: #3264fe;
    pointer-events: auto;
}

input[type="range"]:active::-webkit-slider-thumb {
    background-color: #ffffff;
    border: 1px solid #3264fe;
}
</style>