<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { defaultFilter } from '~/helpers/defaultFilter';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { debounce } from '~/helpers/debounce';

const props = defineProps<{ initialValue: ProductFilterType }>();

const emit = defineEmits<{ (e: 'filter', filter: ProductFilterType): void }>();
const debouncedEmit = debounce(emit, 500);

const schema = z.object({
    title: z.string().optional(),
    brand: z.string().optional(),
    description: z.string().optional(),
    minRating: z.number().gte(0).lte(5),
    maxRating: z.number().gte(0).lte(5),
    stock: z.number().gte(0),
    minPrice: z.number().gte(0),
    maxPrice: z.number().gte(0),
}).refine((it) => it.minPrice < it.maxPrice, { path: ['minPrice'], message: 'Minimum Price must be less than maximum Price' });
export type ProductFilterType = z.infer<typeof schema>;

const { values, setValues } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: props.initialValue,
});

// костыль, если пришёл фильтр идентичный дефолтному необходмо обновить форму, нужно что бы корректно работало обнуление quety параметров
watch(props.initialValue, () => { if (_isEqual(props.initialValue, defaultFilter)) { setValues(defaultFilter) } });
watch(values, (it) => debouncedEmit('filter', it as ProductFilterType));

</script>

<template>
    <div class="">
        <FormTextInput name="title" label="Title" type="text" placeholder="Iphone" />
        <FormTextInput name="brand" label="Brand" type="text" placeholder="Apple" />
        <FormTextInput name="description" label="Description" type="text" placeholder="Best phone" />
        <FormTwoRangesInput min-name="minRating" max-name="maxRating" label="Rating" :min="0" :max="5" :step="0.01"
            :min-gap="0">
        </FormTwoRangesInput>
        <FormRangeInput name="stock" label="Minimum stock" :min="0" :max="200" :step="1" />
        <FormTwoRangesInput min-name="minPrice" max-name="maxPrice" label="Price" :min="0" :max="2000" :step="1"
            :min-gap="0">
        </FormTwoRangesInput>
    </div>
</template>