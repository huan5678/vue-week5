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
      handleGetProductCategory,
    } = productStore;
    const selectCategory = ref('');
    onMounted(() => {
      handleGetProductCategory();
      handleGetProductList();
    });

    const handleCategoryChange = function() {
      handleGetProductList(selectCategory.value);
    };

    return {
      selectCategory,
      productList: computed(() => productList),
      productCategory: computed(() => productCategory),
      handleCategoryChange,
    };
  },
};
</script>

<template>
  <section className="container mb-14">
    <select
      className="border rounded py-2 px-3 w-3/12 mb-8"
      @change="handleCategoryChange"
      defaultValue=""
      v-model="selectCategory"
    >
      <option value="All">全部</option>
      <option
        v-for="category in productCategory"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
    <ul
      className="grid md:grid-cols-3 lg:grid-cols-4 place-content-stretch align-items-stretch gap-[30px]"
    >
      <ProductCard
        v-for="product in productList"
        :key="product.id"
        :product="product"
      />
    </ul>
  </section>
</template>
