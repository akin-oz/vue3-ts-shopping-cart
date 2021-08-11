<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <a v-if="currentPage !== 1" @click="prev" class="pagination__link">
          <IconArrowLeft />
        </a>
      </li>
      <li
        class="pagination__item"
        v-for="(p,i) in visiblePages"
        :key="i"
      >
        <a @click="goTo(p)" :class="`pagination__link${p === '...' ? ' disabled' : ''}${currentPage === p ? ' current' : ''}`">
          {{ p }}
        </a>
      </li>
      <li class="pagination__item">
        <a v-if="currentPage < lastPage" @click="next" class="pagination__link">
          <IconArrowRight />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
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
      type: String,
    },
  },
  setup (props) {
    const store = useStore();
    const total = computed(() => store.state.itemCount);

    const {
      lastPage,
      offset,
      next,
      prev,
      first,
      last,
      goTo,
      visiblePages,
      currentPage,
    } = usePagination({
      pageSize: 6,
      total: computed(() => store.state.itemCount),
      currentPage: parseInt(props.page),
      offset: ((parseInt(props.page) - 1) * 6),
    })

    return {
      total,
      offset,
      next,
      prev,
      first,
      last,
      goTo,
      currentPage,
      lastPage,
      visiblePages,
    }
  }
})
</script>

<style lang="scss">
.pagination {
  height: 45px;
  margin: 30px auto;
  text-align: center;

  &__list {
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }
  &__item {
    height: 100%;
    width: 45px;
    font-family: 'Lato-Bold', sans-serif;
    font-size: 13px;
    letter-spacing: 1.39px;
    text-align: center;
  }
  &__link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444A59;

    &:hover {
      &:not(.disabled) {
        text-decoration: underline;
        cursor: pointer;
      }
      &.disabled {
        cursor: not-allowed;
      }
    }
    &.current {
      font-weight:900;
    }
    .icon {
      width: 8px;
      fill: #444A59;
    }
  }
}
</style>