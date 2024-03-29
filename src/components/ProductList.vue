<template>
  <ul class="product-list row">
        <li class="product-list__item col-md-4 col-sm-6 col-xs-12"
          v-for="item in items"
          :key="item.uuid"
        >
          <div class="product">
            <figure class="product__image-wrapper">
              <img
                class="product__image"
                :src="`${item.cover_image_url}&ar=3:2&fit=crop`"
                :alt="item.title"
                itemprop="image"
              />
              <button
                itemprop="wishlist-button"
                class="product__wishlist-button button button--round button--wishlist"
                @click="handleClickStar(item)"
              >
                <IconWishlist :style="isInWishlist(item.uuid) ? 'fill: orange;' : ''" />
              </button>
            </figure>
            <div class="product__details">
              <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
              <p class="product__subtitle" itemprop="description">{{ item.description }}</p>
              <div class="product__price" v-if="item.discount > 0">
                <span class="product__price--strike">{{ item.original_retail_price.formatted_value }}</span>
                <span class="product__price--discounted" itemprop="price">{{ item.retail_price.formatted_value }}</span>
              </div>
              <div class="product__price" v-else>
                <span class="product__price" itemprop="price">{{ item.retail_price.formatted_value }}</span>
              </div>
              <button
                v-if="isInBag(item.uuid)"
                class="product__add-to-cart button button--primary button--in-cart"
              >{{ t('inCart') }}</button>
              <button
                v-else
                class="product__add-to-cart button button--primary"
                @click="handleAddBagItem(item)"
                itemprop="add-button"
              >{{ t('addToCart') }}</button>
            </div>
          </div>
        </li>
      </ul>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import IconWishlist from '@/components/icons/IconWishlist.vue';

import { BAG_STORE, WISHLIST_STORE } from "@/store/constants";
import { BagStateTypes, ItemData, WishlistStateTypes } from "@/store/interfaces";

export default defineComponent({
  components: {
    IconWishlist,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
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
    const isInWishlist = (uuid: string) => wishlistItems.value.some(item => item.uuid === uuid);
    const handleClickStar = (item: ItemData) => {
      if(isInWishlist(item.uuid)) {
        store.dispatch(WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM, item)
      } else {
        store.dispatch(WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM, item)
      }
    }
    return {
      items,
      handleAddBagItem,
      handleClickStar,
      isInBag,
      isInWishlist,
      t,
    }
  },
})
</script>
