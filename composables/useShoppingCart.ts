import { onMounted } from "vue";
import { z } from "zod";

const ShoppingCartProductSchema = z.object({
  title: z.string(),
  id: z.number(),
  price: z.number(),
  discountPercentage: z.number().nullable(),
  thumbnail: z.string(),
});

export type ShoppingCartProduct = z.infer<typeof ShoppingCartProductSchema>;

const shopItems = ref<ShoppingCartProduct[]>([]);
const isOpen = ref<boolean>(false);

export const useShoppingCart = () => {
  function addItem(item: ShoppingCartProduct) {
    shopItems.value.push(item);
    saveToLocalStorage(shopItems.value);
  }

  function removeItem(id: number) {
    shopItems.value = shopItems.value.filter((it) => it.id !== id);
    saveToLocalStorage(shopItems.value);
  }

  function clearCart() {
    shopItems.value = [];
    saveToLocalStorage(shopItems.value);
  }

  function setOpen(state: boolean) {
    isOpen.value = state;
  }

  const shopItemsCount = computed(() => shopItems.value.length);

  // Для коректной работы в SSR дынные из localStorage грузяться в onMounted
  onMounted(() => {
    if (!shopItems.value.length) {
      shopItems.value = loadFromLocalStorage();
    }
  });

  return {
    shopItems,
    shopItemsCount,
    addItem,
    removeItem,
    setOpen,
    isOpen,
    clearCart,
  };
};

const LOCAL_STORAGE_KEY = "SHOPPING_CART";

function loadFromLocalStorage() {
  const rawProducts = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!rawProducts) return [];
  const products = z
    .array(ShoppingCartProductSchema)
    .safeParse(JSON.parse(rawProducts));
  if (!products.success) return [];
  return products.data;
}

function saveToLocalStorage(products: ShoppingCartProduct[]) {
  return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}
