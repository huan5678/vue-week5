import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Api } from '@/api';

export const useAdminStore = defineStore('admin', function() {
  const token = ref('');
  const expired = ref('');
  const isLoggedIn = ref(false);

  function handleCheckUser() {
    Api({ method: 'post', url: 'api/user/check', token: token.value })
      .then((res) => {
        isLoggedIn.value = res.data.success;
        return res.data.success;
      })
      .catch((err) => {
        console.dir(err);
        isLoggedIn.value = err.response.data.success;
        return err.response.data.success;
      });
  }

  function handleGetToken() {
    const cookies = document.cookie.split(';');
    cookies.forEach((c) => {
      if (c.trim().startsWith('backendToken=')) {
        token.value = c.trim().split('=')[1];
      }
    });
    return cookies;
  }

  function handleSetLogin(data) {
    token.value = data.token;
    expired.value = data.expired;
    isLoggedIn.value = true;
    document.cookie = `backendToken=${data.token}; expires=${new Date(
      data.expired,
    )};`;
  }
  function handleSetLogout() {
    isLoggedIn.value = false;
    token.value = '';
    expired.value = '';
    Api({ method: 'post', url: 'api/user/logout' });
  }

  function handleClearToken() {
    document.cookie = `backendToken=; expires=${new Date(0)};`;
  }

  return {
    token,
    expired,
    isLoggedIn,
    handleSetLogin,
    handleSetLogout,
    handleCheckUser,
    handleGetToken,
    handleClearToken,
  };
});
