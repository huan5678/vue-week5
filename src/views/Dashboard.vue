<script>
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';
import ProductsTable from '@/components/ProductsTable.vue';
import Modal from '@/components/Modal.vue';
import ModalCardDetail from '@/components/ModalCardDetail.vue';
import ModalCardDelete from '@/components/ModalCardDelete.vue';
import ModalCardAddition from '@/components/ModalCardAddition.vue';
export default {
  components: {
    ProductsTable,
    Modal,
    ModalCardDetail,
    ModalCardDelete,
    ModalCardAddition,
  },
  setup() {
    const { adminStore, modalStore } = useStore();
    const { handleCheckUser, handleGetToken } = adminStore;

    const { state } = modalStore;

    const router = useRouter();

    onBeforeMount(() => {
      handleGetToken();
      handleCheckUser();
      const cookieToken = handleGetToken();
      cookieToken[0] === '' && router.push('/login');
    });

    return {
      modalState: computed(() => state.modalType),
      products: computed(() => state.modalProps),
    };
  },
};
</script>

<template>
  <main class="bg-gray-100">
    <div class="container">
      <ProductsTable />
      <Modal>
        <ModalCardDelete v-if="modalState === 'productDelete'" />
        <ModalCardDetail v-if="modalState === 'getDetail'" />
        <ModalCardAddition
          v-if="modalState === 'productEdit' || modalState === 'productCreate'"
          :products="products"
        />
      </Modal>
    </div>
  </main>
</template>
