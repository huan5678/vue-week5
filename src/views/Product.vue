<script>
import ProductsList from '@/components/ProductsList.vue';
import CartList from '@/components/CartList.vue';
import OrderForm from '@/components/OrderForm.vue';
export default {
  components: { ProductsList, CartList, OrderForm },
  setup() {},
};
</script>

<template>
  <div>
    <ProductsList />
    <CartList />
    <OrderForm />
  </div>
</template>
