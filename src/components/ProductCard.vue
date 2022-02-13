<script>
export default {
  setup(props, context) {
    const product = context.attrs.product;
    return {
      product,
    };
  },
};
</script>

<template>
  <li class="relative flex flex-col">
    <div class="group cursor-pointer">
      <div class="overflow-clip">
        <img
          :src="product.images"
          :alt="product.title"
          class="w-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
        />
      </div>
      <div class="overflow-clip">
        <button
          type="button"
          class="w-full bg-black text-white grid place-content-center text-xl py-3 mb-2 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:bg-secondary-900"
        >
          加入購物車
        </button>
      </div>
    </div>
    <h2 class="text-xl">{{ product.title }}</h2>
    <h3 class="text-h2 mt-auto">
      <span class="block text-xl line-through">
        {{ product.origin_price }}
      </span>
      {{ product.price }}
    </h3>
  </li>
</template>
