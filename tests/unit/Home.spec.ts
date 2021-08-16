import { nextTick } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { mount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/ThePagination.vue';
import { state } from "@/store/modules/bag/state"
import { ROOT_STORE} from "@/store/constants";
import mockItem from '../mocks/productItem.json';
const useAxios = jest.fn().mockImplementation(() => ({
  data: mockItem,
  getData: jest.fn()
}));


describe("Home.vue", () => {
  it("should render correctly", async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          component: Home
        },
      ]
    })
    const mockedFn = jest.fn();
    const store = createStore({
      actions: {
        [ROOT_STORE.ACTIONS.UPDATE_VERSION]: mockedFn,
        [ROOT_STORE.ACTIONS.ITEM_LISTS]: mockedFn,
        [ROOT_STORE.ACTIONS.ITEM_COUNT]: mockedFn,
      },
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
        provide: {
          store
        },
        mocks: useAxios,
      }
    })

    expect(wrapper.findComponent(ProductList).exists()).toBe(true);
    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
  })
})