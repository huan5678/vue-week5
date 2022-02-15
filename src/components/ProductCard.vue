<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';
import { $vfm } from 'vue-final-modal';

export default {
  props: ['product'],
  setup(props, { emit }) {
    const product = { ...props.product };
    const { cartStore } = useStore();
    const { handleAddCart } = cartStore;
    const isOpenModal = ref(false);
    const qty = ref(0);
    function handleOpenProductModal(id) {
      isOpenModal.value = true;
      $vfm.show(id);
      emit('handleOpenProductModal', $vfm.show(id));
    }
    function handleUpdateCart(id, qty) {
      handleAddCart(id, qty);
      isOpenModal.value = false;
    }
    return {
      qty,
      products: product,
      handleAddCart,
      isLoading: computed(() => cartStore.isLoading),
      isOpenModal,
      handleOpenProductModal,
      handleUpdateCart,
    };
  },
};
</script>

<template>
  <div class="cursor-pointer group h-full" @click="handleOpenProductModal">
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
  <div class="overflow-clip">
    <button
      type="button"
      class="w-full bg-secondary-700 text-gray-50 flex justify-center items-center gap-2 text-xl py-4 transition-all duration-500 ease-in-out hover:scale-110 hover:bg-secondary-900"
      :class="isLoading === products.id ? 'bg-gray-300 hover:bg-gray-300' : ''"
      :disabled="isLoading === products.id"
      @click="handleAddCart(products.id)"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-300"
        :class="isLoading === products.id ? '' : 'hidden'"
        :disabled="isLoading === products.id"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      加入購物車
    </button>
  </div>
  <vue-final-modal
    v-model="isOpenModal"
    :name="products.id"
    classes="flex justify-center items-center bg-opacity-50 backdrop-blur-[2px]"
    content-class="bg-gray-50 rounded-md shadow-md overflow-hidden"
    focus-trap
  >
    <div class="bg-gray-900 flex justify-between items-center space-y-3">
      <h2 class="text-white text-lg p-4">{{ products.title }}</h2>
      <button
        type="button"
        class="text-gray-50 p-4 transition-all duration-200 ease-in-out hover:text-gray-100 hover:scale-125"
        @click="isOpenModal = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-x h-8 w-8"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
    <section
      class="flex flex-col overflow-hidden space-y-4 bg-gray-50 rounded-md pb-4"
    >
      <div class="flex justify-between p-4">
        <img
          class="max-h-[300px]"
          :src="products.imageUrl"
          :alt="products.title"
        />
        <div class="p-4 flex-1 space-y-8">
          <div class="flex items-center gap-4">
            <h2 class="font-bold text-xl mb-2">
              {{ products.title }}
              <span
                class="px-2 py-1 ml-2 rounded text-sm bg-primary-400 text-white"
              >
                {{ products.category }}
              </span>
            </h2>
            <ul class="flex items-center gap-1">
              <li v-for="(star, idx) in 5" :key="star + new Date()">
                <svg
                  v-show="products.rating > idx"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="h-6 w-6 text-warning-500"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  />
                </svg>
                <svg
                  v-show="products.rating <= idx"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="h-6 w-6 text-gray-400"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                  />
                </svg>
              </li>
            </ul>
          </div>

          <ul class="space-y-4">
            <li>商品描述：{{ products.description }}</li>
            <li>商品內容：{{ products.content }}</li>
            <li>
              {{ products.price }}
              <span class="pl-1 text-gray-400 line-through">{{
                products.origin_price
              }}</span>
              個 / 元
            </li>
            <li class="flex flex-col justify-between gap-4">
              <select v-model="qty" class="w-1/2">
                <option value="0" selected disabled>請選擇訂購數量</option>
                <option v-for="i in 20" :value="i" :key="i + products.id">
                  {{ i }}
                </option>
              </select>
              <button
                class="w-full flex justify-center items-center py-3 rounded border border-danger-700 transition duration-300"
                @click="handleUpdateCart(products.id, qty)"
                :disabled="qty === 0"
                :class="
                  qty === 0
                    ? 'bg-danger-700 text-gray-50 opacity-40 cursor-not-allowed'
                    : 'bg-danger-500 text-gray-50 hover:bg-danger-700'
                "
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-danger-50"
                  :class="isLoading === products.id ? '' : 'hidden'"
                  :disabled="isLoading === products.id"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>

                加入購物車
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex gap-4 overflow-x-auto">
        <img
          v-for="img in products.imagesUrl"
          :key="img"
          class="max-h-48 w-1/12 object-cover flex-auto"
          :src="img"
        />
      </div>
    </section>
  </vue-final-modal>
</template>
