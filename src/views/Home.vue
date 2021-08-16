<template>
  <div class="product-page">
    <div class="container" style="padding: 0">
      page: {{page}} offset: {{ offset }}
      <ProductList></ProductList>
      <Pagination :page="page" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useAxios } from '@/use/useAxios';

import Pagination from '@/components/ThePagination.vue';
import ProductList from '@/components/ProductList.vue';

import { ROOT_STORE} from "@/store/constants";
import { ItemData } from "@/store/interfaces";

export default defineComponent({
  name: 'Home',
  components: {
    Pagination,
    ProductList,
  },
  setup () {
    const store = useStore();
    const route = useRoute();
    const page = computed(() => parseInt(route.query.page as string, 10) || 1);
    const offset = computed(() => (page.value - 1) * 6);

    watch(
      () => page,
      async () => {
        const {
          data: response,
          getData
        } = useAxios(
          'getActivities',
          {
            offset: offset.value,
            limit: 6,
            venue_in: '164'
          },
        );
        await getData();    
        
        store.dispatch(
        ROOT_STORE.ACTIONS.ITEM_LISTS,
        response.value.data.map((item: ItemData) => {
          const {
            uuid,
            cover_image_url,
            title,
            description,
            retail_price,
            original_retail_price,
            discount,
          } = item;

          return {
            uuid,
            cover_image_url,
            title,
            description,
            retail_price,
            original_retail_price,
            discount,
          }
        })
      );
      store.dispatch(ROOT_STORE.ACTIONS.ITEM_COUNT, response.value.meta.count ?? 0)
      },
      {
        immediate: true,
        deep: true,
      }
    )

    return {
      page,
      offset,
    }
  }
});
</script>