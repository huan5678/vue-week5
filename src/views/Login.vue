<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';
import { Api } from '@/api';
export default {
  setup() {
    const { adminStore } = useStore();
    const { handleSetLogin, handleGetToken } = adminStore;
    const router = useRouter();
    const userName = ref('');
    const userPassword = ref('');

    function handlerSubmit() {
      const username = userName.value;
      const password = userPassword.value;
      const data = {
        username,
        password,
      };
      Api({
        method: 'post',
        url: 'admin/signin',
        data: data,
      })
        .then((res) => {
          const data = {
            token: res.data.token,
            expired: res.data.expired,
          };
          handleSetLogin(data);
          router.push('/admin');
        })
        .catch((err) => {
          console.dir(err);
        });
    }

    onMounted(() => {
      const cookieToken = handleGetToken();
      cookieToken[0] !== '' && router.push('/admin');
    });

    return {
      userName,
      userPassword,
      handlerSubmit,
    };
  },
};
</script>

<template>
  <main class="flex justify-center items-center h-screen bg-gray-50">
    <div class="container max-w-lg">
      <form
        class="space-y-8 p-8 bg-white rounded shadow-sm"
        @submit.prevent="handlerSubmit"
      >
        <legend class="text-4xl text-center">請先登入</legend>
        <div>
          <label for="userName" class="mb-4 block">使用者帳號</label>
          <input
            id="userName"
            type="text"
            name="userName"
            placeholder="請輸入帳號Email"
            v-model.trim="userName"
            class="p-2 rounded border w-full bg-gray-50 invalid:text-primary-600 invalid:border-primary-600 focus:ring-primary-500 focus:text-primary-600 text-primary-800"
          />
        </div>
        <div>
          <label for="userPassword" class="mb-4 block">使用者密碼</label>
          <input
            id="userPassword"
            type="password"
            class="p-2 rounded border w-full bg-gray-50 invalid:text-primary-600 invalid:border-primary-600 focus:ring-primary-500 focus:text-primary-600 text-primary-800"
            v-model="userPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-primary-500 text-white rounded-lg py-4 w-100 transition duration-300 hover:bg-primary-600"
        >
          登入
        </button>
      </form>
    </div>
  </main>
</template>
