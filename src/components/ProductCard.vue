<script>
import { computed } from 'vue';
import useStore from '@/stores';

export default {
  props: ['product'],
  setup(props) {
    const product = { ...props.product };
    const { cartStore } = useStore();
    const { handleAddCart } = cartStore;

    return {
      products: product,
      handleAddCart,
      isLoading: computed(() => cartStore.isLoading),
    };
  },
};
</script>

<template>
  <div class="cursor-pointer group">
    <div class="overflow-clip">
      <img
        :src="products.imageUrl"
        :alt="products.title"
        class="w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
      />
    </div>
    <ul class="p-4 space-y-4">
      <li>
        <h2 class="text-xl text-center">{{ products.title }}</h2>
      </li>
      <li class="flex justify-between">
        <span>原價</span>
        <span class="line-through">
          {{ products.origin_price }}
        </span>
      </li>
      <li class="flex justify-between">
        <span>特價</span>
        <span class="text-xl">{{ products.price }}</span>
      </li>
    </ul>
  </div>
  <button
    type="button"
    class="w-full bg-black text-white grid place-content-center text-xl py-3 transition-all duration-500 ease-in-out hover:scale-110 hover:bg-secondary-900"
    :class="isLoading ? 'opacity-10' : ''"
    :disabled="isLoading"
    @click="handleAddCart(products.id)"
  >
    加入購物車
  </button>
</template>
