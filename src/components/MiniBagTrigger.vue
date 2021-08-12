<template>
  <div class="minibag-trigger__count">
    <div class="minibag-trigger__price">
    {{ totalPrice }}
    </div>
    <IconBag class="icon" />
    <span class="j-badge">{{ itemCount }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/use/useStore';
import { BAG_STORE } from "@/store/constants";
import IconBag from '@/components/icons/IconBag.vue'
import { BagStateTypes } from '@/store/interfaces';

export default defineComponent({
  components: {
    IconBag,
  },
  setup () {
    const store = useStore();
    const itemCount = computed(() => store.getters[BAG_STORE.GETTERS.BAG_ITEM_COUNT]);
    const totalPrice = computed(
      () => {
        const price = ((store.state.bagModule as unknown) as BagStateTypes).totalPrice;
        return price ? `€ ${price}` : ''
      }
    );
    
    return {
      totalPrice,
      itemCount,
    }
  }
})
</script>
