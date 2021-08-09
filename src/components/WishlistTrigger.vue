<template>
  <div class="wishlist-trigger__count">
    <IconWishlist class="icon" />
    <span class="j-badge">{{ itemCount }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/use/useStore';
import { WISHLIST_STORE } from "@/store/constants";
import IconWishlist from '@/components/icons/IconWishlist.vue'

export default defineComponent({
  components: {
    IconWishlist,
  },
  setup () {
    const store = useStore();
    const itemCount = computed(() => store.getters[WISHLIST_STORE.GETTERS.WISHLIST_ITEM_COUNT]);
    console.log(store.getters);
    
    return {
      itemCount,
    }
  }
})
</script>

<style lang="scss">
  .wishlist-trigger__count {
    height: 25px;
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
  }
</style>