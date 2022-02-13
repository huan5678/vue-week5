<script>
import { computed, ref } from 'vue';
import useStore from '@/stores';
import ModalCardTitle from './ＭodalCardTitle.vue';

export default {
  components: { ModalCardTitle },
  props: { products: Object },
  setup(props) {
    const { modalStore, adminProductStore } = useStore();
    const { state, closeModal } = modalStore;
    const { handleEditProduct, handleCreateProduct, handleImageUpload } =
      adminProductStore;

    const productData = computed({
      get: () => Object.assign({}, props.products),
      set: (val) => val,
    });

    const imageFile = ref(null);

    function handleProductAddition() {
      state.modalType === 'productEdit'
        ? handleEditProduct(productData.value.id, productData.value)
        : handleCreateProduct(productData.value);
      handleResetFormInput();
    }

    function handleResetFormInput() {
      productData.value = {
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
      };
      closeModal();
    }

    function handleGetImageUrl(target) {
      const file = imageFile.value.files[0];
      console.log(imageFile);
      console.log(file);
      handleImageUpload(file)
        .then((res) => {
          target === 'mainImage'
            ? (productData.value.imageUrl = res.data.imageUrl)
            : productData.value.imagesUrl.push(res.data.imageUrl);
          console.log(res.data);
        })
        .catch((err) => {
          console.dir(err);
        });
    }

    function handleRemoveImageArr(idx) {
      productData.value.imagesUrl.splice(idx, 1);
    }

    return {
      selectType: computed(() => state.modalType),
      closeModal,
      productData,
      imageFile,
      handleResetFormInput,
      handleProductAddition,
      handleGetImageUrl,
      handleRemoveImageArr,
    };
  },
};
</script>

<template>
  <section
    class="flex flex-col overflow-hidden space-y-4 bg-gray-50 rounded-md pb-4"
  >
    <ModalCardTitle
      :title="selectType === 'productEdit' ? '內容編輯' : '新增產品'"
      :close-modal="closeModal"
    />
    <form
      class="p-4 space-y-4 container"
      @submit.prevent="handleProductAddition"
    >
      <div class="flex space-between gap-4">
        <div class="flex-auto">
          <label for="productName" class="block mb-4">產品名稱</label>
          <input
            type="text"
            id="productName"
            name="productName"
            class="rounded w-full"
            v-model="productData.title"
            required
          />
        </div>
        <div class="flex-auto">
          <label for="productContent" class="block mb-4">產品說明</label>
          <input
            type="text"
            id="productContent"
            name="productContent"
            class="rounded w-full"
            v-model="productData.content"
            required
          />
        </div>
        <div class="flex-auto">
          <label for="productCategory" class="block mb-4">產品類別</label>
          <select
            class="rounded w-full"
            id="productCategory"
            required
            v-model="productData.category"
          >
            <option value="測試分類">測試分類</option>
            <option value="上衣類">上衣類</option>
            <option value="褲類">褲類</option>
            <option value="裙類">裙類</option>
            <option value="鞋類">鞋類</option>
          </select>
        </div>
        <div class="flex-auto">
          <label for="productRating" class="block mb-4">產品星級</label>
          <select
            class="rounded w-full"
            id="productRating"
            required
            v-model="productData.rating"
          >
            <option v-for="star in 5" :value="star" :key="star + new Date()">
              {{ star }}星
            </option>
          </select>
        </div>
      </div>
      <div class="flex space-between gap-4">
        <div class="flex-auto">
          <div class="flex justify-between gap-2">
            <div class="flex-1">
              <label for="productMainImage" class="block mb-4"
                >產品主圖片</label
              >
              <input
                type="file"
                accept="image/*"
                id="productImages"
                name="productImages"
                ref="imageFile"
                class="rounded block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-secondary-100 file:text-secondary-700 hover:file:bg-secondary-300"
                @change="handleGetImageUrl('mainImage')"
              />
            </div>
            <img
              class="max-h-48 object-cover flex-auto"
              v-if="productData.imageUrl"
              :src="productData.imageUrl"
              alt="產品主圖"
            />
          </div>
        </div>
      </div>
      <div>
        <label for="productImages" class="block mb-4">產品附屬圖片</label>
        <input
          type="file"
          accept="image/*"
          id="productImages"
          name="productImages"
          ref="imageFile"
          class="rounded block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-secondary-100 file:text-secondary-700 hover:file:bg-secondary-300"
          @change="handleGetImageUrl()"
        />
      </div>
      <ul class="flex justify-between gap-2">
        <li
          class="flex-auto"
          v-for="(item, idx) in productData.imagesUrl"
          :key="item + idx"
        >
          <input
            type="text"
            v-model="productData.imagesUrl[idx]"
            class="rounded w-full"
          />
          <div class="relative">
            <img
              class="object-cover max-h-48 w-max rounded-xl"
              v-if="item !== ''"
              :src="item"
              alt="附屬圖片"
            />
            <button
              class="absolute top-0 right-0 text-secondary-100 p-4"
              type="button"
              @click="handleRemoveImageArr(idx)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                />
              </svg>
            </button>
          </div>
        </li>
      </ul>
      <div class="">
        <label for="productDescription" class="block mb-4">產品描述</label>
        <textarea
          id="productDescription"
          name="productDescription"
          class="rounded w-full"
          v-model="productData.description"
        />
      </div>
      <div class="flex space-between gap-4">
        <div class="flex-auto">
          <label for="productIsEnable" class="block mb-4">產品啟用狀態</label>
          <select
            class="rounded w-full"
            id="productIsEnable"
            required
            v-model="productData.is_enabled"
          >
            <option value="0">未啟用</option>
            <option value="1">啟用</option>
            <option value="2">未上架</option>
            <option value="3">已下架</option>
          </select>
        </div>
        <div class="flex-auto">
          <label for="productOriginPrice" class="block mb-4">產品原價</label>
          <input
            type="text"
            id="productOriginPrice"
            name="productOriginPrice"
            class="rounded w-full"
            v-model.number="productData.origin_price"
          />
        </div>
        <div class="flex-auto">
          <label for="productPrice" class="block mb-4">產品最終價格</label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            class="rounded w-full"
            required
            v-model.number="productData.price"
          />
        </div>
        <div class="flex-auto">
          <label for="productUnit" class="block mb-4">產品品項單位</label>
          <input
            type="text"
            id="productUnit"
            name="productUnit"
            class="rounded w-full"
            v-model="productData.unit"
          />
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <button
          class="flex-auto py-2 bg-success-500 text-white hover:bg-success-600 hover:shadow hover:shadow-success-400 transition duration-300 rounded-md"
          type="submit"
        >
          {{ selectType === "productEdit" ? "確定修改" : "新增產品" }}
        </button>
        <button
          class="flex-auto py-2 bg-gray-500 text-white hover:bg-gray-600 hover:shadow hover:shadow-gray-400 transition duration-300 rounded-md"
          @click="handleResetFormInput()"
          type="reset"
        >
          {{ selectType === "productEdit" ? "取消修改" : "取消新增" }}
        </button>
      </div>
    </form>
  </section>
</template>
