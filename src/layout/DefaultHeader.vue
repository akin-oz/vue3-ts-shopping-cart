<template>
  <div class="default-header container">
    <h1 class="default-header__title">Shopping Cart</h1>
    <div class="default-header__spacer"></div>
    <div class="default-header__actions">
      <div class="default-header__action-item">
        <MiniBagTrigger @mouseenter="toggleMiniBag" itemprop="minibag-trigger"></MiniBagTrigger>
      </div>
      <div class="default-header__action-item">
        <WishlistTrigger></WishlistTrigger>
      </div>
    </div>
    <MiniBag v-if="isMiniBagActive" @mouseleave="toggleMiniBag" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import MiniBag from '@/components/MiniBag.vue'
import MiniBagTrigger from '@/components/MiniBagTrigger.vue'
import WishlistTrigger from '@/components/WishlistTrigger.vue'

export default defineComponent({
  components: {
    MiniBag,
    MiniBagTrigger,
    WishlistTrigger,
  },
  setup () {
    const isMiniBagActive: Ref<boolean> = ref(false)
    const toggleMiniBag = () => {
      isMiniBagActive.value = !isMiniBagActive.value
    }

    return {
      toggleMiniBag,
      isMiniBagActive,
    }
  }
})
</script>
