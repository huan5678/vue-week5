<script>
import useStore from '@/stores';
import { onMounted, computed } from 'vue';
export default {
  setup() {
    const { cartStore } = useStore();
    const {
      cartData,
      handleGetCart,
      handleDeleteCart,
      handleClearCart,
      handleUpdateCart,
    } = cartStore;

    function moneyFormat(num, qty) {
      qty !== undefined && (num = num * qty);
      return num !== undefined ? Number(num.toFixed(1)).toLocaleString() : 0;
    }

    onMounted(() => {
      handleGetCart();
    });
    return {
      cartList: computed(() => cartData.list),
      cartTotalPrice: computed(() => moneyFormat(cartData.totalPrice)),
      cartFinalPrice: computed(() => moneyFormat(cartData.finalPrice)),
      handleDeleteCart: handleDeleteCart,
      handleClearCart: handleClearCart,
      handleUpdateCart: handleUpdateCart,
      moneyFormat,
    };
  },
};
</script>

<template>
  <section class="bg-gray-light pt-12 pb-18">
    <h2 class="text-center text-2xl mb-8">購物車</h2>
    <table class="container">
      <thead>
        <tr>
          <th class="text-xl font-normal text-left w-4/12">品項</th>
          <th class="text-xl font-normal text-right w-2/12">單價</th>
          <th class="text-xl font-normal text-right w-2/12">數量</th>
          <th class="text-xl font-normal text-right w-2/12">金額</th>
          <th class="w-2/12"></th>
        </tr>
      </thead>
      <tbody class="text-xl font-normal mb-5">
        <tr class="border-b" v-for="cart in cartList" :key="cart.id">
          <td class="flex gap-4 items-center py-5">
            <img
              class="h-20 w-20 object-cover"
              :src="cart.product.imageUrl"
              :alt="cart.product.title"
            />
            <h3>{{ cart.product.title }}</h3>
          </td>
          <td class="text-right">
            <span class="block line-through text-sm">
              NT${{ moneyFormat(cart.product.origin_price) }}
            </span>
            NT${{ moneyFormat(cart.product.price) }}
          </td>
          <td class="text-right">
            <select
              class="rounded"
              v-model="cart.product.qty"
              @change="handleUpdateCart(cart.id, cart.product.qty)"
            >
              <option v-for="i in 20" :value="i" :key="i + cart.product.id">
                {{ i }}
              </option>
            </select>
          </td>
          <td class="text-right">
            <span class="block line-through text-sm">
              NT${{ moneyFormat(cart.product.origin_price, cart.product.qty) }}
            </span>
            NT${{ moneyFormat(cart.product.price, cart.product.qty) }}
          </td>
          <td class="text-center">
            <button class="" @click="handleDeleteCart(cart.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 transition duration-500 ease-out hover:text-primary hover:scale-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot class="text-xl">
        <tr>
          <td colSpan="3" class="py-5">
            <button
              class="rounded py-2 px-5 border border-black transition duration-300 ease-in-out hover:bg-black hover:border-transparent hover:text-white"
              @click="handleClearCart"
              v-if="cartList.length > 0"
            >
              刪除全部品項
            </button>
            <p v-else class="text-left pl-12 pt-3 text-primary">
              您的購物車是空的
            </p>
          </td>
          <td class="text-center">
            <span class="block line-through text-sm">原始總金額</span>
            總金額
          </td>
          <td class="text-center">
            <span class="block line-through text-sm">
              NT${{ cartTotalPrice }}
            </span>
            NT${{ cartFinalPrice }}
          </td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>
