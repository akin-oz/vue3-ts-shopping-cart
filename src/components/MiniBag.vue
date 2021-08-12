<template>
  <div
    class="minibag-wrapper"
  >
    <div
      class="minibag-item"
      v-for="item in bagItems"
      :key="item.uuid"
    >
      <div class="minibag-item__content">
        <img :src="`${item.cover_image_url.split('?')[0]}?w=100&ar=3:2&fit=crop`" alt="">
        <div class="minibag-item__title">
          {{ item.title }}
          <div>
          {{ item.retail_price.formatted_value }}
          </div>
        </div>
      </div>
      <div class="minibag-item__action">
        <button
          @click="handleRemoveItem(item)"
          type="button"
          class="minibag-item__button"
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
    }
    return {
      bagItems,
      totalPrice,
      handleRemoveItem,
    };
  },
});
</script>

<style lang="scss">
.minibag {
  &-wrapper {
    max-height: 500px;
    min-width: 48px;
    max-width: 520px;
    top: 60px;
    right: 0;
    transform-origin: left top;
    z-index: 8;
    position: absolute;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
    border-radius: 4px;
    background-color: #fff;
    border-color: #fff;
    color: rgba(0, 0, 0, 0.87);
  }
  &-item {
    cursor: pointer;
    align-items: center;
    display: flex;
    letter-spacing: normal;
    height: 100px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    &:before {
      background-color:currentColor;
      bottom:0;
      content:"";
      left:0;
      opacity:0;
      pointer-events:none;
      position:absolute;
      right:0;
      top:0;
      transition:.3s cubic-bezier(.25,.8,.5,1);
    }
    &:hover:before {
      opacity: .04
    }
    &.subtotal {
      cursor: default;
      &:hover:before {
        opacity: 0;
      }
    }
    &__content {
      align-items:center;
      align-self:center;
      display:flex;
      overflow:hidden;
      padding:12px 0;
    }
    &__title {
      line-height:1.2;
      overflow: hidden;
      padding-left: 8px;
      align-self: center;
      font-family: "Lato-Bold", sans-serif;
      font-size: 14px;
    }
    &__action {
      display: inline-flex;
      align-self: center;
      margin: 12px 0;
      &:last-of-type {
        &:not(:only-child){
          margin-left: 16px;
        }
      }
    }
    &__button {
      align-items: center;
      display: inline-flex;
      flex: 0 0 auto;
      font-weight: 500;
      letter-spacing: 0.0892857143em;
      justify-content: center;
      outline: 0;
      position: relative;
      text-decoration: none;
      text-indent: 0.0892857143em;
      text-transform: uppercase;
      transition-duration: 0.28s;
      transition-property: box-shadow, transform, opacity;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;
      color: rgba(0, 0, 0, 0.54);
      height: 36px;
      width: 36px;
      font-size: 0.875rem;
      border-radius: 50%;
      min-height: 0;
      min-width: 0;
      padding: 0;
      cursor: pointer;
      border: 0;
      background-color: transparent;
      &::before{
        background-color: currentColor;
        border-radius: inherit;
        bottom: 0;
        color: inherit;
        content: "";
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity 0.2s
      }
      &:hover:before {
        opacity:.08
      }
      &:focus:before {
        opacity: .24
      }
    }
  }
  &-divider {
    display: block;
    flex: 1 1 0px;
    max-width: 100%;
    height: 0;
    max-height: 0;
    border: 1px solid rgba(0,0,0,.12);
    transition: inherit;
  }
}
</style>