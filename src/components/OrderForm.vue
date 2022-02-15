<script>
import { computed, ref } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import useStore from '@/stores';
import InputField from './InputField.vue';
export default {
  components: {
    Form,
    InputField,
  },
  setup() {
    const { orderStore, cartStore } = useStore();
    const { orderResult, orderList, handleSendOrder } = orderStore;
    const { cartData } = cartStore;
    const userRemark = ref('');
    const phoneRegex = /09\d{2}-?\d{3}-?\d{3}/;
    const schema = Yup.object().shape({
      userName: Yup.string().trim().required('請輸入姓名'),
      userEmail: Yup.string()
        .trim()
        .email('請輸入正確的Email信箱')
        .required('請輸入Email'),
      userPhone: Yup.string()
        .test('phone', '請輸入正確的10碼手機號碼(09...)', (value) => {
          return phoneRegex.test(value);
        })
        .required('請輸入電話號碼'),
      userAddress: Yup.string().required('請輸入寄件地址'),
    });

    function handleSubmit(data, { reset }) {
      console.log(data);
      const orderData = {
        name: data.userName,
        email: data.userEmail,
        tel: data.userPhone,
        address: data.userAddress,
        message: userRemark.value,
      };
      handleSendOrder(orderData);
      reset();
    }
    return {
      orderResult: computed(() => orderResult),
      orderList: computed(() => orderList),
      handleSubmit,
      schema,
      userRemark,
      cartListLength: computed(() => cartData.list.length),
    };
  },
};
</script>

<template>
  <section class="container pt-14 pb-20" id="order">
    <h2 class="text-center text-2xl mb-8">填寫訂單資料</h2>
    <Form
      action=""
      class="space-y-4 md:w-2/3 mx-auto"
      @submit="handleSubmit"
      :validation-schema="schema"
    >
      <div class="flex gap-4 justify-between items-start mb-6">
        <InputField
          name="userName"
          type="text"
          label="訂購人姓名"
          placeholder="請輸入姓名"
          :disabled="cartListLength === 0"
          :class="{
            'opacity-30 cursor-not-allowed': cartListLength === 0,
          }"
        />
        <InputField
          name="userPhone"
          type="tel"
          maxlength="10"
          label="訂購人電話"
          placeholder="請輸入電話"
          :disabled="cartListLength === 0"
          :class="{ 'opacity-30 cursor-not-allowed': cartListLength === 0 }"
        />
      </div>
      <InputField
        name="userEmail"
        type="email"
        label="訂購人Email"
        placeholder="請輸入Email"
        :disabled="cartListLength === 0"
        :class="{ 'opacity-30 cursor-not-allowed': cartListLength === 0 }"
      />
      <InputField
        name="userAddress"
        type="text"
        label="訂購人地址"
        placeholder="請輸入地址"
        :disabled="cartListLength === 0"
        :class="{ 'opacity-30 cursor-not-allowed': cartListLength === 0 }"
      />
      <div>
        <label
          for="userRemark"
          class="block mb-2"
          :class="{ 'opacity-30 cursor-not-allowed': cartListLength === 0 }"
          >備註</label
        >
        <textarea
          id="userRemark"
          name="userRemark"
          class="form-control w-full"
          v-model="userRemark"
          rows="4"
          placeholder="想要告訴我們什麼？"
          :disabled="cartListLength === 0"
          :class="{ 'opacity-30 cursor-not-allowed': cartListLength === 0 }"
        ></textarea>
      </div>

      <div class="pt-12">
        <button
          type="submit"
          class="w-10/12 rounded bg-black text-white grid place-content-center text-xl py-3 mx-auto transition duration-300 ease-in-out hover:bg-primary-dark"
          :class="{
            'opacity-30 cursor-not-allowed': cartListLength === 0,
          }"
          :disabled="cartListLength === 0"
        >
          {{ cartListLength > 0 ? '送出預訂資料' : '目前購物車沒有商品' }}
        </button>
      </div>
    </Form>
  </section>
</template>
