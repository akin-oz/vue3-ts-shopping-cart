<template>
  <div class="default">
    <DefaultHeader></DefaultHeader>
    <slot></slot>
    <DefaultFooter></DefaultFooter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultHeader from '@/layout/DefaultHeader.vue'
import DefaultFooter from '@/layout/DefaultFooter.vue'

export default defineComponent({
  components: {
    DefaultHeader,
    DefaultFooter,
  },
  setup () {
    

    return {}
  }
})
</script>