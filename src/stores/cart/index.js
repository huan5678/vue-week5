import { reactive } from 'vue';
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
    isLoading: false,
  });

  function handleAddCart(id, qty = 1) {
    cartData.isLoading = true;
    Api({
      method: 'post',
      url: `api/${apiPath}/order`,
      data: {
        product_id: id,
        qty,
      },
    })
      .then((res) => {
        // console.log(res.data);
        cartData.data = res.data.data;
        cartData.message = res.data.message;
        cartData.isLoading = false;
      })
      .catch((err) => {
        console.dir(err);
        cartData.isLoading = false;
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
    cartData.isLoading = true;
    Api({
      method: 'delete',
      url: `api/${apiPath}/cart/${id}`,
    })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        cartData.isLoading = false;
      })
      .catch((err) => {
        console.dir(err);
        cartData.isLoading = false;
      });
  }

  function handleUpdateCart(id, qty) {
    cartData.isLoading = true;
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
        cartData.isLoading = false;
      })
      .catch((err) => {
        console.dir(err);
        cartData.isLoading = false;
      });
  }

  function handleClearCart() {
    cartData.isLoading = true;
    Api({
      method: 'delete',
      url: `api/${apiPath}/carts`,
    })
      .then((res) => {
        // console.log(res.data);
        cartData.message = res.data.message;
        cartData.isLoading = false;
      })
      .catch((err) => {
        console.dir(err);
        cartData.isLoading = false;
      });
  }

  return {
    cartData,
    handleAddCart,
    handleGetCart,
    handleDeleteCart,
    handleUpdateCart,
    handleClearCart,
  };
});
