import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import { mount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import WishlistTrigger from '@/components/WishlistTrigger.vue';
import { WISHLIST_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';


describe("WishlistTrigger.vue", () => {
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
        wishlistModule: {
          actions: {
            [WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          },
          state: {
            wishlistItems: mockItem,
          },
          mutations: {
            [WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          },
          getters: {
            [WISHLIST_STORE.GETTERS.WISHLIST_ITEM_COUNT]: () => 6,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(WishlistTrigger, {
      global: {
        plugins: [router],
        provide: {
          store
        },
      }
    })
        
    expect(wrapper.vm.itemCount).toBe(6);
  })
})