<template>
  <button
    :id="id"
    :class="[className]"
    @click="clickFn"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

type TProps = {
  id: string;
  className: string;
}

export default defineComponent({
  name: 'SfButton',
  setup(props: TProps) {
    const { id, className } = ref(props).value;

    const clickFn = (evt: MouseEvent) => {
      console.log(evt);
    };
    return {
      id,
      className,
      clickFn,
    };
  },
});
</script>
<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #d04a02;
  color: #d04a02;
  background-color: #fff;
  transition: .5s;

  &:hover {
    background-color: #d04a02;
    color: #fff;
  }
}
</style>
