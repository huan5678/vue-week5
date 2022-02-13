<script>
import AppLink from './AppLink.vue';
export default {
  components: { AppLink },
};
</script>
<template>
  <nav class="container flex justify-between p-3">
    <h2>
      <AppLink to="/"> LOGO </AppLink>
    </h2>
    <ul class="flex justify-between items-center gap-4">
      <li>
        <AppLink to="product"> 產品列表 </AppLink>
      </li>
      <li>
        <AppLink to="admin"> 後台管理 </AppLink>
      </li>
      <!-- <li>
        <AppLink to="http://google.com">Google</AppLink>
      </li> -->
    </ul>
  </nav>
</template>
