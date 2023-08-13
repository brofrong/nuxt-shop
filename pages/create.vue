<script setup lang="ts">
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { insertProductSchema } from '~/server/db/schemas/products.schema';
import { FetchResult } from 'nuxt/app';

const route = useRoute();
const router = useRouter();

const schema = insertProductSchema;


let initialValues: FetchResult<'/api/product', 'get'> | null = null;

if (route.query.id) {
    const { data } = await useFetch('/api/product', { query: { id: route.query.id } });
    initialValues = data.value;
    console.log(initialValues);
}

const { validate, setFieldError } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: initialValues
});


async function submit() {
    const { valid, values } = await validate()
    if (!valid) return;

    $fetch('/api/product', {
        body: values,
        method: 'POST',
        onResponse: async ({ response }) => {
            const newProduct = z.object({ id: z.number() }).parse(response._data);
            navigateTo(`/product/${newProduct.id}`);
        },
        onResponseError: (error) => setFieldError('title', error?.error?.message || 'Some error occurred when creating new product')
    });

}

</script>

<template>
    <div class="container p-4 m-auto">
        <form @submit.prevent="submit">
            <FormTextInput name="title" type="text" label="Title" placeholder="Iphone 11 Pro" />
            <!-- TODO: change to textArea -->
            <FormTextInput name="description" type="text" label="Description"
                placeholder="The iPhone 11 Pro and iPhone 11 Pro Max are smartphones designed, developed and marketed by Apple Inc." />
            <FormTextInput name="price" type="number" label="Price" placeholder="420" />
            <FormTextInput name="discountPercentage" type="number" label="Discount Percentage" placeholder="15.5"
                :step="0.01" />
            <FormTextInput name="rating" type="number" label="Rating" placeholder="4.2" :step="0.01" />
            <FormTextInput name="stock" type="number" label="Stock" placeholder="69" />
            <FormTextInput name="brand" type="text" label="Brand" placeholder="Apple" />
            <FormTextInput name="category" type="text" label="Category" placeholder="Smartphones" />
            <FormTextInput name="thumbnail" type="text" label="Thumbnail"
                placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/IPhone_11_Pro_Midnight_Green.svg/200px-IPhone_11_Pro_Midnight_Green.svg.png" />

            <button class="px-4 py-2 text-white bg-blue-600 rounded" type="submit">{{ initialValues ? 'Update' :
                'Create' }}</button>
        </form>
    </div>
</template>