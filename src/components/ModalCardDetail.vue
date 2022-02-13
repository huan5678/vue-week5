<script>
import { computed } from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ＭodalCardTitle.vue';
export default {
  components: { ModalCardTitle },
  setup() {
    const { modalStore } = useStore();
    const { state, closeModal } = modalStore;
    return {
      targetProduct: computed(() => state.modalProps),
      closeModal,
    };
  },
};
</script>

<template>
  <section
    class="flex flex-col overflow-hidden space-y-4 bg-gray-50 rounded-md pb-4"
  >
    <ModalCardTitle title="產品詳細內容" :close-modal="closeModal" />
    <div class="flex justify-between p-4">
      <img
        class="max-h-[300px]"
        :src="targetProduct.imageUrl"
        :alt="targetProduct.title"
      />
      <div class="p-4 flex-1 space-y-8">
        <div class="flex items-center gap-4">
          <h2 class="font-bold text-xl mb-2">
            {{ targetProduct.title }}
            <span
              class="px-2 py-1 ml-2 rounded text-sm bg-primary-400 text-white"
            >
              {{ targetProduct.category }}
            </span>
          </h2>
          <ul class="flex items-center gap-1">
            <li v-for="(star, idx) in 5" :key="star + new Date()">
              <svg
                v-show="targetProduct.rating > idx"
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
                v-show="targetProduct.rating <= idx"
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
          <li>商品描述：{{ targetProduct.description }}</li>
          <li>商品內容：{{ targetProduct.content }}</li>
          <li>
            {{ targetProduct.price }}
            <span class="pl-1 text-gray-400 line-through">{{
              targetProduct.origin_price
            }}</span>
            個 / 元
          </li>
        </ul>
      </div>
    </div>
    <div class="flex gap-4 overflow-x-auto">
      <img
        v-for="img in targetProduct.imagesUrl"
        :key="img"
        class="max-h-48 w-1/12 object-cover flex-auto"
        :src="img"
      />
    </div>
  </section>
</template>
