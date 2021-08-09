<template>
  <div class="product-page">
    <div class="container">
      <ul class="product-list">
        <li class="product-list__item"
          v-for="item in items"
          :key="item.uuid"
        >
          <div class="product">
            <figure class="product__image-wrapper">
              <img class="product__image" :src="item.cover_image_url" :alt="item.title" itemprop="image"/>
              <button class="product__wishlist-button button button--round button--wishlist">
              <IconWishlist />
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
              <button class="product__add-to-cart button button--primary">Add to Cart</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import useAxios from '@/use/useAxios';

import IconWishlist from '@/components/icons/IconWishlist.vue';

import { ROOT_STORE } from "@/store/constants";
import { ItemData } from "@/store/interfaces";

export default defineComponent({
  name: 'Home',
  components: {
    IconWishlist,
  },
  setup () {
    const store = useStore();
    const { data, loading, error, getData } = useAxios('getActivities', { id: '164', params: { offset: 0, limit: 6 }});
    getData().then(() => {
      store.dispatch(ROOT_STORE.ACTIONS.ITEM_LISTS, data.value.map((item) => {
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
      }));
    });

    const items = computed(() => store.state.itemLists as ItemData[]);

    return { items, loading, error }
    
  }
});
</script>
<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  height: 100%;

  background-color: #ffffff;

  &__image {
    max-width: 100%;
    height: auto;
    &-wrapper {
      padding: 20px;
      position: relative;
      text-align: center;
    }
  }

  &__wishlist-button {
    width: 35px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 10px;
    right: 10px;
  }

  &__details {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: 10px 20px 20px;
    text-align: center;
  }

  &__title {
    padding-bottom: 10px; 
    
    font-family: 'Lato-Bold', sans-serif;
    font-size: 14px;
    letter-spacing: 1.37px;
    text-transform: uppercase;
  }

  &__subtitle {
    padding-bottom: 10px; 

    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.43px;

    color: #808080;
  }

  &__price {
    padding-bottom: 20px;
    
    font-family: 'Lato-Bold', sans-serif;
    font-size: 14px;
    letter-spacing: 2.33px;

    &--strike {
      margin-right: 10px;
      text-decoration: line-through;
    }

    &--discounted {
      color: #F54B5E;
    }
  }


  &-page {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    margin: 30px 0 20px;
  }
  &-list {
    display: flex;
    flex: 0 1 auto;
    flex-flow: row wrap;
    margin: 0 -10px;
    &__item {
    padding: 10px;
    flex: 1 0 33.3333%;
    max-width: 33.3333%;
}
  }
}
</style>