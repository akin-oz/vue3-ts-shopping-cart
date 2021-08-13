import { watch, Ref, computed, reactive, toRefs } from "vue";

export type PaginationControl = () => void;


export interface PaginationResult {
  pageSize: Ref<number>;
  total: Ref<number>;
  currentPage: Ref<number>;
  offset: Ref<number>;
  lastPage: Readonly<Ref<number>>;
  visiblePages: Readonly<Ref<(string | number | null)[]>>
  next: PaginationControl;
  prev: PaginationControl;
  first: PaginationControl;
  last: PaginationControl;
  goTo: (page:number) => void;
}

export interface PaginationOptions {
  pageSize: number;
  total: Ref<number>;
  currentPage: number;
  offset: number;
}

export function usePagination(options: PaginationOptions): PaginationResult {

  const state = reactive({
    currentPage: options.currentPage,
    pageSize: options.pageSize,
    total: options.total,
    offset: options.offset,
  })

  watch(
    () => state.currentPage,
    (newVal) => {
      if (newVal < 1) {
        state.currentPage = 1;
      }
    },
    {
      immediate: true,
    }
  )

  const lastPage = computed(() => Math.ceil(state.total / state.pageSize));

  const goTo = (page:number) => {
    state.currentPage = page
  };
  const prev = () => (goTo(state.currentPage - 1));
  const next = () => (goTo(state.currentPage + 1));
  const first = () => (goTo(1));
  const last = () => (goTo(lastPage.value));

  const visiblePages = computed(() => {
    const firstPage = state.currentPage > 3 ? 1 : null;
    const prevPage = state.currentPage >= 2 ? state.currentPage - 1 : null;
    const nextPage = state.currentPage >= lastPage.value ? null : state.currentPage + 1;
    const finalPage = nextPage && nextPage < lastPage.value ? lastPage.value : null;

    return [
      firstPage,
      firstPage ? '...' : null,
      prevPage,
      state.currentPage,
      nextPage,
      finalPage ? '...' : null,
      finalPage
    ].filter(Boolean);
  });

  watch(
    () => state,
    (newVal) => {
      if (newVal.currentPage > lastPage.value) {
        newVal.currentPage = lastPage.value;
      }
    },
    {
      deep: true,
    }
  )
  watch(
    () => state.currentPage,
    (newVal) => {
      state.offset = (newVal - 1) * state.pageSize;
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    ...toRefs(state),
    visiblePages,
    lastPage,
    next,
    prev,
    first,
    last,
    goTo,
  };
}