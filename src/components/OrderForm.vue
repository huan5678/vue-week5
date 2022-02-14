<script>
import { computed } from 'vue';
import { Form } from 'vee-validate';
import useStore from '@/stores';
import InputField from './InputField.vue';
export default {
  components: {
    Form,
    InputField,
  },
  setup() {
    const { orderStore } = useStore();
    const { orderResult, orderList, handleSendOrder } = orderStore;
    function handleSubmit(data) {
      console.log(data);
      console.log(handleSendOrder());
    }
    return {
      orderResult: computed(() => orderResult),
      orderList: computed(() => orderList),
      handleSubmit,
    };
  },
};
</script>

<template>
  <section class="container pt-14 pb-20" id="order">
    <h2 class="text-center text-2xl mb-8">填寫訂單資料</h2>
    <Form action="" class="space-y-4 md:w-1/2 mx-auto" @submit="handleSubmit">
      <div class="flex gap-4 justify-between items-center mb-6">
        <InputField
          name="userName"
          type="text"
          label="訂購人姓名"
          placeholder="請輸入姓名"
        />
        <InputField
          name="userPhone"
          type="tel"
          label="訂購人電話"
          placeholder="請輸入電話"
        />
      </div>
      <InputField
        name="userEmail"
        type="email"
        label="訂購人Email"
        placeholder="請輸入Email"
      />
      <InputField
        name="userAddress"
        type="text"
        label="訂購人地址"
        placeholder="請輸入地址"
      />
      <div>
        <label for="userRemark" class="block mb-2">備註</label>
        <textarea
          id="userRemark"
          name="userRemark"
          class="border rounded py-2 w-full"
          rows="4"
          placeholder="想要告訴我們什麼？"
        ></textarea>
      </div>

      <div class="pt-12">
        <button
          type="submit"
          class="w-10/12 rounded bg-black text-white grid place-content-center text-xl py-3 mx-auto transition duration-300 ease-in-out hover:bg-primary-dark"
        >
          送出預訂資料
        </button>
      </div>
    </Form>
  </section>
</template>
