import { DirectiveBinding } from "nuxt/dist/app/compat/capi";

export default defineNuxtPlugin((nuxtApp) => {
  let element: HTMLElement | null = null;
  let callback: (() => void) | null = null;

  function click(event: MouseEvent) {
    if (!element || !callback) return;

    const target = event.target as HTMLElement;

    if (!element.contains(target)) {
      callback();
    }
  }

  nuxtApp.vueApp.directive("click-outside", {
    mounted(el: HTMLElement, binding: DirectiveBinding<() => void>) {
      element = el;
      callback = binding.value;

      // setTimeout что бы проигнорировать клик при котором был создан компонент
      setTimeout(() => window.addEventListener("click", click), 0);
    },
    unmounted() {
      window.removeEventListener("click", click);
    },
  });
});
