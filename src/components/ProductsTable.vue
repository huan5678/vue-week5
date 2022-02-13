<script>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores';

export default {
  setup() {
    const { adminStore, adminProductStore, modalStore } = useStore();
    const { handleSetLogout, handleClearToken } = adminStore;
    const { productList, handleGetProductList } = adminProductStore;
    const { openModal } = modalStore;
    const router = useRouter();
    const tempProduct = ref({
      title: '',
      category: '',
      origin_price: 0,
      price: 0,
      unit: '',
      description: '',
      content: '',
      is_enabled: '',
      imageUrl: '',
      imagesUrl: [],
    });

    function handleIsLogout() {
      handleClearToken();
      handleSetLogout();
      router.push('/');
    }

    onMounted(() => {
      handleGetProductList();
      // handleGetProductAll();
    });
    return {
      productList: computed(() => productList),
      openModal,
      tempProduct,
      handleIsLogout,
      handleGetProductList,
    };
  },
};
</script>
<template>
  <section class="space-y-4 p-2 overflow-auto">
    <div class="flex justify-end items-center p-6 gap-4">
      <h2 class="text-4xl font-medium">產品列表</h2>
      <h2 class="text-xl ml-auto">管理者登出</h2>
      <button
        class="rounded px-6 py-2 bg-danger-500 text-white hover:bg-danger-600 hover:shadow hover:shadow-danger-400 transition duration-300"
        @click="handleIsLogout()"
      >
        登出
      </button>
    </div>
    <table class="table-auto mb-4 rounded bg-gray-50">
      <thead class="bg-gray-800">
        <tr class="text-white">
          <td width="200" class="p-4 text-lg whitespace-nowrap">產品名稱</td>
          <td width="250" class="p-4 text-lg whitespace-nowrap text-right">
            原價
          </td>
          <td width="250" class="p-4 text-lg whitespace-nowrap text-right">
            售價
          </td>
          <td width="250" class="p-4 text-lg whitespace-nowrap text-center">
            是否啟用
          </td>
          <td width="200" class="p-4 text-lg whitespace-nowrap text-center">
            查看細節
          </td>
          <td
            colspan="2"
            width="400"
            class="p-4 text-lg whitespace-nowrap text-center"
          >
            功能
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-300 hover:bg-gray-200"
          v-for="item in productList.products"
          :key="item.id"
        >
          <td class="py-2 px-4 whitespace-nowrap">{{ item.title }}</td>
          <td class="py-2 px-4 whitespace-nowrap text-right">
            {{ item.origin_price }}
          </td>
          <td class="py-2 px-4 whitespace-nowrap text-right">
            {{ item.price }}
          </td>
          <td
            class="py-2 px-4 whitespace-nowrap text-primary-400 text-center"
            v-if="item.is_enabled == 1"
          >
            啟用
          </td>
          <td
            class="py-2 px-4 whitespace-nowrap text-gray-400 text-center"
            v-else-if="item.is_enabled == 0"
          >
            未啟用
          </td>
          <td
            class="py-2 px-4 whitespace-nowrap text-warning-600 text-center"
            v-else-if="item.is_enabled == 2"
          >
            未上架
          </td>
          <td
            class="py-2 px-4 whitespace-nowrap text-danger-700 text-center"
            v-if="item.is_enabled == 3"
          >
            已下架
          </td>

          <td class="py-2 px-4 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-primary-500 rounded py-2 px-4 hover:bg-primary-600 hover:shadow hover:shadow-primary-400 transition duration-200"
              @click="openModal('getDetail', item)"
            >
              查看細節
            </button>
          </td>
          <td class="py-2 px-4 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-secondary-700 rounded py-2 px-4 hover:bg-secondary-800 hover:shadow hover:shadow-secondary-400 transition duration-200"
              @click="openModal('productEdit', item)"
            >
              修改內容
            </button>
          </td>
          <td class="py-2 px-4 text-center whitespace-nowrap">
            <button
              type="button"
              class="text-white bg-danger-500 rounded py-2 px-4 hover:bg-danger-600 hover:shadow hover:shadow-danger-400 transition duration-200"
              @click="openModal('productDelete', item)"
            >
              刪除品項
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center">
      <p>目前有{{ productList.products.length }}項產品</p>
      <button
        type="button"
        class="text-white bg-warning-500 rounded py-2 px-4 hover:bg-warning-600 hover:shadow hover:shadow-warning-400 transition duration-200"
        @click="openModal('productCreate', tempProduct)"
      >
        新增品項
      </button>
    </div>
    <!-- 分頁 -->
    <div>
      <ul class="flex justify-center items-center gap-2">
        <li class="">
          <button
            type="button"
            class="p-2 rounded border border-primary-500 text-primary-500 disabled:border-gray-400 disabled:text-gray-500"
            :disabled="!productList.pagination.has_pre"
            @click="
              handleGetProductList(productList.pagination.current_page - 1)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class=""
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </button>
        </li>
        <li
          v-for="page in productList.pagination.total_pages"
          :key="page + new Date()"
        >
          <button
            type="button"
            class="py-[6px] px-3 rounded border-primary-500"
            :class="{
              'bg-primary-700 text-white':
                page === productList.pagination.current_page,
            }"
            @click="handleGetProductList(page)"
          >
            {{ page }}
          </button>
        </li>
        <li class="">
          <button
            type="button"
            class="p-2 rounded border border-primary-500 text-primary-500 disabled:border-gray-400 disabled:text-gray-500"
            :disabled="!productList.pagination.has_next"
            @click="
              handleGetProductList(productList.pagination.current_page + 1)
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class=""
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
