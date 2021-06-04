import { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    const scrollTop: number = binding.value;
    window.onscroll = function (): void {
      if (window.scrollY > scrollTop) {
        el.focus();
      }
    };
  },

  unmounted(): void {
    window.onscroll = null;
  },
};
