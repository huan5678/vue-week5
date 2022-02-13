import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useProductStore } from '@/stores/product';

export const useModalStore = defineStore('modal', function() {
  const productStore = useProductStore();

  const state = reactive({
    isOpen: false,
    modalType: '',
    modalProps: {},
  });

  function openModal(modalType, modalProps) {
    state.isOpen = true;
    state.modalType = modalType;
    state.modalProps = modalProps;
    productStore.productList.currentPage =
      productStore.productList.pagination.currentPage;
  }

  function closeModal() {
    state.isOpen = false;
  }

  return {
    state,
    openModal,
    closeModal,
  };
});
