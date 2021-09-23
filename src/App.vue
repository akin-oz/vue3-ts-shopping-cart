<template>
  <DefaultLayout><router-view/></DefaultLayout>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useMeta } from 'vue-meta'
import { useI18n } from 'vue-i18n'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import { ItemData } from '@/store/interfaces'

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    const store = useStore()
    const items = computed(() => store.state.itemLists as ItemData[]);
    const count = computed(() => store.state.itemCount);
    useMeta({
      title: 'Shopping Cart',
      htmlAttrs: {
        lang: 'en',
        amp: true
      },
      script: [{
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          numberOfItems: count.value,
          itemListElement: items.value.map(item => {
            return {
              "@type": "Product",
              image: item.cover_image_url,
              name: item.title,
              description: item.description,
              offers: {
                "@type": "Offer",
                "price": item.retail_price?.formatted_value
              }
            }
          })
        }
      }]
    })

    const locale = computed(() => localStorage.getItem('locale') ?? 'it');
    const { locale: currentLocale } = useI18n();
    currentLocale.value = locale.value

    return {}
  },
})
</script>