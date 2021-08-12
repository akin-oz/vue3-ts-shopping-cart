<template>
  <div class="product-page">
    <div class="container" style="padding: 0">
      <ul class="product-list row">
        <li class="product-list__item col-md-4 col-sm-6 col-xs-12"
          v-for="item in items"
          :key="item.uuid"
        >
          <div class="product">
            <figure class="product__image-wrapper">
              <img class="product__image" :src="`${item.cover_image_url}&ar=3:2&fit=crop`" :alt="item.title" itemprop="image"/>
              <button class="product__wishlist-button button button--round button--wishlist" @click="handleClickStar(item)">
              <IconWishlist :style="isInWishlist(item.uuid) ? 'fill: orange;' : ''" />
              </button>
            </figure>
            <div class="product__details">
              <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
              <p class="product__subtitle" itemprop="description">{{ item.description }}</p>
              <div class="product__price" itemscope itemtype="http://schema.org/Offer" v-if="item.discount > 0">
                <span class="product__price--strike">{{ item.original_retail_price.formatted_value }}</span>
                <span class="product__price--discounted" itemprop="price">{{ item.retail_price.formatted_value }}</span>
              </div>
              <div class="product__price" itemscope itemtype="http://schema.org/Offer" v-else>
                <span class="product__price" itemprop="price">{{ item.retail_price.formatted_value }}</span>
              </div>
              <button v-if="isInBag(item.uuid)" class="product__add-to-cart button button--primary button--in-cart">In Cart</button>
              <button v-else class="product__add-to-cart button button--primary" @click="handleAddBagItem(item)">Add to Cart</button>
            </div>
          </div>
        </li>
      </ul>
      <Pagination :page="page" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useAxios } from '@/use/useAxios';

import IconWishlist from '@/components/icons/IconWishlist.vue';
import Pagination from '@/components/ThePagination.vue';

import { BAG_STORE, ROOT_STORE, WISHLIST_STORE } from "@/store/constants";
import { BagStateTypes, ItemData, WishlistStateTypes } from "@/store/interfaces";

export default defineComponent({
  name: 'Home',
  components: {
    IconWishlist,
    Pagination,
  },
  setup () {
    const store = useStore();
    const route = useRoute();
    const page = route.query.page || 1;
    watch(
      () => route.query.page,
      (newVal) => {
        
        const {
          data: response,
          getData
        } = useAxios(
          'getActivities',
          {
            offset: newVal ? ((parseInt(newVal as string) - 1) * 6) : 0,
            limit: 6,
            venue_in: '164'
          }
        );
        getData().then(() => {      
          store.dispatch(ROOT_STORE.ACTIONS.ITEM_LISTS, response.value.data.map((item: ItemData) => {
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
          }) ?? [] as ItemData[]);
          store.dispatch(ROOT_STORE.ACTIONS.ITEM_COUNT, response.value.meta.count ?? 0)
        });
      },
      {
        immediate: true,
        deep: true,
      }
    )

    const handleAddBagItem = (item: ItemData) => {
      store.dispatch(BAG_STORE.ACTIONS.ADD_BAG_ITEM, item)
    }

    const items = computed(() => store.state.itemLists as ItemData[]);

    const bagItems = computed(
      () =>
        ((store.state.bagModule as unknown) as BagStateTypes).bagItems
    );
    const wishlistItems = computed(
      () =>
        ((store.state.wishlistModule as unknown) as WishlistStateTypes).wishlistItems
    );
    const isInBag = (uuid: string) => bagItems.value.some(item => item.uuid === uuid);
    const isInWishlist = (uuid: string) => wishlistItems.value.some(item => item.uuid === uuid)
    const handleClickStar = (item: ItemData) => {
      if(isInWishlist(item.uuid)) {
        store.dispatch(WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM, item)
      } else {
        store.dispatch(WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM, item)
      }
    }

    return {
      items,
      page,
      handleAddBagItem,
      handleClickStar,
      isInBag,
      isInWishlist,
    }
  }
});
</script>