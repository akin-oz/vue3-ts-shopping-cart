import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { mount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import MiniBag from '@/components/MiniBag.vue';
// import ProductList from '@/components/ProductList.vue';
// import Pagination from '@/components/ThePagination.vue';
import { BAG_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';
import { nextTick } from 'vue';


describe("MiniBag.vue", () => {
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
      modules: {
        bagModule: {
          actions: {
            [BAG_STORE.ACTIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]: mockedFn,
          },
          state: {
            bagItems: mockItem,
            totalPrice: 814,
          },
          mutations: {
            [BAG_STORE.MUTATIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM]: mockedFn,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(MiniBag, {
      global: {
        plugins: [router],
        provide: {
          store
        },
      }
    })

    expect(wrapper.vm.bagItems.length).toBe(6);
    expect(wrapper.vm.totalPrice).toBe('€ 814');
  })
  it("should remove item correctly", async () => {
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
      modules: {
        bagModule: {
          actions: {
            [BAG_STORE.ACTIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]: mockedFn,
          },
          state: {
            bagItems: mockItem,
            totalPrice: 814,
          },
          mutations: {
            [BAG_STORE.MUTATIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM]: mockedFn,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(MiniBag, {
      global: {
        plugins: [router],
        provide: {
          store
        },
      }
    })

    wrapper.find(".minibag-item__button").trigger('click');
    await nextTick();
    expect(mockedFn).toHaveBeenCalled();
  })
})