import { useAdminStore } from './admin';
import { useAdminProductStore } from './adminProduct';
import { useProductStore } from './product';
import { useModalStore } from './modal';
import { useOrderStore } from './order';
import { useCartStore } from './cart';

export default function useStore() {
  const adminStore = useAdminStore();
  const adminProductStore = useAdminProductStore();
  const modalStore = useModalStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();
  const cartStore = useCartStore();

  return {
    adminStore,
    adminProductStore,
    modalStore,
    productStore,
    orderStore,
    cartStore,
  };
}
