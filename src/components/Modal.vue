<script>
import { computed } from 'vue';
import useStore from '@/stores';
export default {
  setup() {
    const { modalStore } = useStore();
    const { state, closeModal } = modalStore;

    function handlerBackdropClick(e) {
      // 點擊目標是svg跟path也就是按鈕的圖示 不做動作跳出要不會報錯沒有e.path[0]的屬性
      if (e.path[0].nodeName === 'svg' || e.path[0].nodeName === 'path') {
        return null;
      }
      e.path[0].className.match('backdrop') && closeModal();
    }

    return {
      isOpenModal: computed(() => state.isOpen),
      handlerBackdropClick,
    };
  },
};
</script>

<template>
  <teleport to="body">
    <div
      ref="targetElement"
      class="absolute top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen bg-gray-700 bg-opacity-50 backdrop-blur-[2px] backdrop"
      :class="isOpenModal ? '' : 'invisible -z-10'"
      @click="handlerBackdropClick"
    >
      <div
        class="transition-all container backdrop p-8 flex justify-center items-center"
        :class="
          isOpenModal
            ? 'ease-[cubic-bezier(.51,.24,.32,1.3)] duration-300'
            : 'scale-0 opacity-0 ease-[cubic-bezier(.31,1.09,1,.99)] duration-75'
        "
      >
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
