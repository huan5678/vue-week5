<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: { Header },
};
</script>
<template>
  <main>
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>
