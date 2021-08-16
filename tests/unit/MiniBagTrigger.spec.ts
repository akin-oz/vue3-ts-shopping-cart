import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { mount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import MiniBagTrigger from '@/components/MiniBagTrigger.vue';
import { BAG_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';


describe("MiniBagTrigger.vue", () => {
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
          },
          getters: {
            [BAG_STORE.GETTERS.BAG_ITEM_COUNT]: mockedFn,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(MiniBagTrigger, {
      global: {
        plugins: [router],
        provide: {
          store
        },
      }
    })

    expect(mockedFn).toHaveBeenCalled();
    expect(wrapper.vm.totalPrice).toBe('€ 814');
  })
})