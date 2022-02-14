import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/api';

export const useCartStore = defineStore('cart', function() {
  const apiPath = process.env.VUE_APP_API_PATH;
  const cartData = reactive({
    data: {},
    message: '',
    list: [],
    totalPrice: 0,
    finalPrice: 0,
  });

  const isLoading = ref(false);

  function handleAddCart(id, qty = 1) {
    isLoading.value = true;
    Api({
      method: 'post',
      url: `api/${apiPath}/cart`,
      data: {
        data: {
          product_id: id,
          qty,
        },
      },
    })
      .then((res) => {
        // console.log(res.data);
        cartData.data = res.data.data;
        cartData.message = res.data.message;
        isLoading.value = false;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  function handleGetCart() {
    Api({
      method: 'get',
      url: `api/${apiPath}/cart`,
    })
      .then((res) => {
        // console.log(res.data);
        cartData.list = res.data.data.carts;
        cartData.totalPrice = res.data.data.total;
        cartData.finalPrice = res.data.data.final_total;
      })
      .catch((err) => {
        console.dir(err);
      });
  }

  function handleDeleteCart(id) {
    isLoading.value = true;
    Api({
      method: 'delete',
      url: `api/${apiPath}/cart/${id}`,
    })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        isLoading.value = false;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  function handleUpdateCart(id, qty) {
    isLoading.value = true;
    Api({
      method: 'put',
      url: `api/${apiPath}/cart/${id}`,
      data: {
        data: {
          product_id: id,
          qty,
        },
      },
    })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        isLoading.value = false;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  function handleClearCart() {
    isLoading.value = true;
    Api({
      method: 'delete',
      url: `api/${apiPath}/carts`,
    })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        isLoading.value = false;
      })
      .catch((err) => {
        console.dir(err);
        isLoading.value = false;
      });
  }

  return {
    cartData,
    isLoading,
    handleAddCart,
    handleGetCart,
    handleDeleteCart,
    handleUpdateCart,
    handleClearCart,
  };
});
