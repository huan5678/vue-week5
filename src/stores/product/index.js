import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/api';

export const useProductStore = defineStore('product', function() {
  const apiPath = process.env.VUE_APP_API_PATH;
  const productList = reactive({
    products: [],
    pagination: {},
    currentPage: 1,
    productDetail: {},
  });
  const isLoading = ref(false);
  const productCategory = ref([]);

  function handleGetProductAll() {
    isLoading.value = true;
    Api({
      method: 'get',
      url: `api/${apiPath}/products/all`,
    })
      .then((res) => {
        // console.log(res.data);
        productList.products = res.data.products;
        res.data.products.forEach((product) => {
          if (!productCategory.value.includes(product.category)) {
            productCategory.value.push(product.category);
          }
        });
        isLoading.value = false;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  function handleGetProductList(category, page = productList.currentPage) {
    isLoading.value = true;
    Api({
      method: 'get',
      url: `api/${apiPath}/products?page=${page}${
        category ? `&category=${category}` : ''
      }`,
    })
      .then((res) => {
        // console.log(res.data);
        isLoading.value = false;
        productList.products = res.data.products;
        productList.pagination = res.data.pagination;
      })
      .catch((err) => {
        isLoading.value = false;
        console.dir(err);
      });
  }

  function handleGetProductDetail(id) {
    isLoading.value = true;
    Api({
      method: 'get',
      url: `api/${apiPath}/product/${id}`,
    })
      .then((res) => {
        // console.log(res.data);
        isLoading.value = false;
        productList.productDetail = res.data.product;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  return {
    productList,
    handleGetProductAll,
    handleGetProductList,
    productCategory,
    handleGetProductDetail,
    isLoading,
  };
});
