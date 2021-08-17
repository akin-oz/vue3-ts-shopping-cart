<template>
  <div
    class="minibag-wrapper"
    itemprop="minibag"
    v-show="bagItems.length"
  >
    <div
      class="minibag-item row"
      v-for="item in bagItems"
      :key="item.uuid"
    >
      <div class="minibag-item__content col-xs-11">
        <img :src="`${item.cover_image_url.split('?')[0]}?w=100&ar=3:2&fit=crop`" alt="">
        <div class="minibag-item__title">
          {{ item.title }}
          <div>
          {{ item.retail_price.formatted_value }}
          </div>
        </div>
      </div>
      <div class="minibag-item__action col-xs-1">
        <button
          @click="handleRemoveItem(item)"
          type="button"
          class="minibag-item__button"
          itemprop="remove-button"
        >
        <IconDelete />
        </button>
      </div>
    </div>
    <hr class="minibag-divider">
    <div class="minibag-item subtotal">
      <div class="minibag-item__content" style="justify-content: space-between; width: 100%;">
        <div>Cart Subtotal:</div>
        <div style="margin-left: 1rem;">{{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BAG_STORE } from "@/store/constants";
import { BagStateTypes, ItemData } from "@/store/interfaces";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import IconDelete from '@/components/icons/IconDelete.vue'

export default defineComponent({
  components: {
    IconDelete,
  },
  setup() {
    const store = useStore();
    const bagItems = computed(
      () => ((store.state.bagModule as unknown) as BagStateTypes).bagItems
    );
    const totalPrice = computed(
      () => {
        const price = ((store.state.bagModule as unknown) as BagStateTypes).totalPrice;
        return price ? `€ ${price}` : ''
      }
    );
    const handleRemoveItem = (item: ItemData) => {
      store.dispatch(BAG_STORE.ACTIONS.REMOVE_BAG_ITEM, item)
    };
    return {
      bagItems,
      totalPrice,
      handleRemoveItem,
    };
  },
});
</script>
