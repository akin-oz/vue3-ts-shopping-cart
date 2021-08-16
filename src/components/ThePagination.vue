<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <a v-if="currentPage !== 1" @click="handlePageChange(currentPage - 1)" class="pagination__link">
          <IconArrowLeft />
        </a>
      </li>
      <li
        class="pagination__item"
        v-for="(p,i) in visiblePages"
        :key="i"
      >
        <a @click="handlePageChange(p)" :class="`pagination__link${p === '...' ? ' disabled' : ''}${currentPage === p ? ' current' : ''}`">
          {{ p }}
        </a>
      </li>
      <li class="pagination__item">
        <a v-if="currentPage < lastPage" @click="handlePageChange(currentPage + 1)" class="pagination__link">
          <IconArrowRight />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { usePagination } from '@/use/usePagination'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

export default defineComponent({
  components: {
    IconArrowLeft,
    IconArrowRight,
  },
  props: {
    page: {
      type: Number,
    },
  },
  setup (props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const total = computed(() => store.state.itemCount);

    const {
      lastPage,
      offset,
      goTo,
      visiblePages,
      currentPage,
    } = usePagination({
      pageSize: 6,
      total: computed(() => store.state.itemCount),
      currentPage: props.page,
      offset: ((props.page - 1) * 6),
    })

    const handlePageChange = (page) => {
      goTo(page)
      router.push({...route, query: {...route.query, page}})
    }

    return {
      total,
      offset,
      handlePageChange,
      currentPage,
      lastPage,
      visiblePages,
    }
  }
})
</script>
