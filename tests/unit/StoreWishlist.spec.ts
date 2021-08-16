import * as store from '@/store/modules/wishlist';
import { mutations } from "@/store/modules/wishlist/mutations"
import { state } from "@/store/modules/wishlist/state"
import { actions } from "@/store/modules/wishlist/actions"
import { getters } from "@/store/modules/wishlist/getters"
import { WISHLIST_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';

describe("wishlist", () => {
  it("should render wishlist module correctly", () => {
    expect(store.default).toMatchObject({
      state,
      getters,
      mutations,
      actions,
    })
  })
  it("should mutate state correctly", () => {
    mutations[WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM](state, mockItem[0])
    mutations[WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM](state, mockItem[1])
    mutations[WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM](state, mockItem[0])

    expect(state).toMatchObject({
      wishlistItems: [mockItem[1]],
    })
  })
  it("should return getter correctly", () => {
    mutations[WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM](state, mockItem[0])
    mutations[WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM](state, mockItem[1])
    mutations[WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM](state, mockItem[0])

    expect(getters[WISHLIST_STORE.GETTERS.WISHLIST_ITEM_COUNT](state)).toBe(1)
  })
})