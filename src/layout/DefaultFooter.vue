<template>
  <div class="default-footer container">
    <p class="default-footer__sidenote">copyright 2021 &copy;</p>
    <div class="default-header__spacer"></div>
    <div class="button-group">
      <button
        v-for="locale in availableLocales"
        :key="`locale-${locale}`"
        :class="`button button--primary${locale === currentLocale ? ' selected' : ''}`"
        :itemprop="`locale-${locale}`"
        @click="handleLocaleChange(locale)"
      >{{ locale }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
setup() {
  const { locale: currentLocale, availableLocales } = useI18n({ useScope: 'global' })

  const handleLocaleChange = (locale: string) => {
    currentLocale.value = locale;
    localStorage.setItem("locale", locale);
  }

  return {
    currentLocale,
    availableLocales,
    handleLocaleChange,
 }
}
})
</script>
