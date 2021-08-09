<template>
  <div class="default-footer container">
    <p class="default-footer__sidenote">Footer</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>
<style lang="scss">
  .default-footer {
    &__sidenote {
      font-family: 'Lato-Bold', sans-serif;
      letter-spacing: 1.37px;
    }
  }
</style>