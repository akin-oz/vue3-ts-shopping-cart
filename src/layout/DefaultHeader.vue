<template>
  <div class="default-header container">
    <h1 class="default-header__title">BRAND</h1>
    <div class="default-header__spacer"></div>
    <div class="default-header__actions">
      <div class="default-header__action-item">
        <MiniBagTrigger></MiniBagTrigger>
      </div>
      <div class="default-header__action-item">
        <WishlistTrigger></WishlistTrigger>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MiniBagTrigger from '@/components/MiniBagTrigger.vue'
import WishlistTrigger from '@/components/WishlistTrigger.vue'

export default defineComponent({
  components: {
    MiniBagTrigger,
    WishlistTrigger,
  },
  setup () {
    

    return {}
  }
})
</script>
<style lang="scss">
  .default-header {
    &__title {
      font-size: 20px;
    }
    &__spacer {
      flex-grow: 1;
    }
    &__actions {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
    }
    &__action-item {
      height: 25px;
      display: flex;
      align-items: flex-end;
      .icon {
        height: auto;
        fill: #444A59;
      }
    }
  }
</style>