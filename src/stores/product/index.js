import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/api';

export const useProductStore = defineStore('product', function() {
  const apiPath = process.env.VUE_APP_API_PATH;
  const productList = reactive({
    products: [],
    pagination: {},
    currentPage: 1,
    category: null,
    productDetail: {},
  });

  const productCategory = ref();

  function handleGetProductAll() {
    Api({
      method: 'get',
      url: `api/${apiPath}/products/all`,
    })
      .then((res) => {
        // console.log(res.data);
        productList.products = res.data.products;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetProductList(
    page = productList.currentPage,
    category = productList.category
  ) {
    Api({
      method: 'get',
      url: `api/${apiPath}/products?page=${page}${
        category ? `&category=${category}` : ''
      }`,
    })
      .then((res) => {
        // console.log(res.data);

        productList.products = res.data.products;
        productList.pagination = res.data.pagination;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetProductDetail(id) {
    Api({
      method: 'get',
      url: `api/${apiPath}/product/${id}`,
    })
      .then((res) => {
        // console.log(res.data);

        productList.productDetail = res.data.product;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleGetProductCategory() {
    handleGetProductAll();
    productList.forEach((product) => {
      if (!productCategory.value.includes(product.category)) {
        productCategory.value.push(product.category);
      }
    });
  }

  return {
    productList,
    handleGetProductAll,
    handleGetProductList,
    productCategory,
    handleGetProductCategory,
    handleGetProductDetail,
  };
});
