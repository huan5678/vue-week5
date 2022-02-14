<script>
import useStore from '@/stores';
import { onMounted, computed, ref } from 'vue';
import ProductCard from './ProductCard.vue';
export default {
  components: {
    ProductCard,
  },
  setup() {
    const { productStore } = useStore();
    const {
      productList,
      handleGetProductList,
      productCategory,
      handleGetProductAll,
      isLoading,
    } = productStore;
    const selectCategory = ref('');
    onMounted(() => {
      handleGetProductAll();
    });

    const handleCategoryChange = function() {
      selectCategory.value === 'All'
        ? handleGetProductAll()
        : handleGetProductList(selectCategory.value);
    };

    return {
      selectCategory,
      productList: computed(() => productList.products),
      productCategory: computed(() => productCategory),
      handleCategoryChange,
      isLoading: computed(() => isLoading),
    };
  },
};
</script>

<template>
  <section class="container mb-14">
    <div class="flex items-center gap-2 mb-6">
      <label for="category" class="text-xl">選擇篩選項目</label>
      <select
        id="category"
        class="border rounded py-2 w-3/12 text-md"
        @change="handleCategoryChange"
        defaultValue="All"
        v-model="selectCategory"
        :disabled="isLoading"
      >
        <option value="" selected disabled>請選擇</option>
        <option value="All">全部</option>
        <option
          v-for="category in productCategory"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <ul class="flex flex-wrap justify-between items-stretch gap-4">
      <li
        class="relative lg:w-1/4 md:w-1/2 rounded-md shadow overflow-hidden -mx-6 flex flex-col justify-between"
        v-for="product in productList"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </li>
    </ul>
  </section>
</template>
