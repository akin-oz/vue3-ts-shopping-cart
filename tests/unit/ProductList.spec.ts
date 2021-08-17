import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import i18n from '@/plugins/i18n'
import { mount } from "@vue/test-utils";
import Home from '@/views/Home.vue';
import ProductList from '@/components/ProductList.vue';
import { BAG_STORE, WISHLIST_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';
import { nextTick } from 'vue';


describe("ProductList.vue", () => {
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
      state: {
        itemLists: mockItem,
      },
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
        },
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
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router, i18n],
        provide: {
          store
        },
      }
    })

    expect(wrapper.vm.items.length).toBe(6);
  })
  it("should add bag item correctly", async () => {
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
      state: {
        itemLists: mockItem,
      },
      modules: {
        bagModule: {
          actions: {
            [BAG_STORE.ACTIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]: mockedFn,
          },
          state: {
            bagItems: [],
            totalPrice: 0,
          },
          mutations: {
            [BAG_STORE.MUTATIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM]: mockedFn,
          }
        },
        wishlistModule: {
          actions: {
            [WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          },
          state: {
            wishlistItems: [],
          },
          mutations: {
            [WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router, i18n],
        provide: {
          store
        },
      }
    })
    wrapper.find(".product__add-to-cart").trigger('click');
    await nextTick();
    expect(mockedFn).toHaveBeenCalled();
  })
  it("should add wishlist item correctly", async () => {
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
      state: {
        itemLists: mockItem,
      },
      modules: {
        bagModule: {
          actions: {
            [BAG_STORE.ACTIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]: mockedFn,
          },
          state: {
            bagItems: [],
            totalPrice: 0,
          },
          mutations: {
            [BAG_STORE.MUTATIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM]: mockedFn,
          }
        },
        wishlistModule: {
          actions: {
            [WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          },
          state: {
            wishlistItems: [],
          },
          mutations: {
            [WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM]: mockedFn,
            [WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM]: mockedFn,
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router, i18n],
        provide: {
          store
        },
      }
    })
    wrapper.find(".product__wishlist-button").trigger('click');
    await nextTick();
    expect(mockedFn).toHaveBeenCalled();
  })
  it("should remove wishlist item correctly", async () => {
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
      state: {
        itemLists: mockItem,
      },
      modules: {
        bagModule: {
          actions: {
            [BAG_STORE.ACTIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]: mockedFn,
          },
          state: {
            bagItems: [],
            totalPrice: 0,
          },
          mutations: {
            [BAG_STORE.MUTATIONS.ADD_BAG_ITEM]: mockedFn,
            [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM]: mockedFn,
          }
        },
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
          }
        }
      }
    })
    router.push('/')
    await router.isReady()
    const wrapper = mount(ProductList, {
      global: {
        plugins: [router, i18n],
        provide: {
          store
        },
      }
    })
    wrapper.find(".product__wishlist-button").trigger('click');
    await nextTick();
    expect(mockedFn).toHaveBeenCalled();
  })
})