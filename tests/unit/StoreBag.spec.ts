import * as store from '@/store/modules/bag'
import { actions } from '@/store/modules/bag/actions'
import { mutations } from "@/store/modules/bag/mutations"
import { state } from "@/store/modules/bag/state"
import { getters } from "@/store/modules/bag/getters"
import { BAG_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';

describe("MUTATIONS", () => {
  it("should render bag module correctly", () => {
    expect(store.default).toMatchObject({
      state,
      getters,
      mutations,
      actions,
    })
  })
  it("should mutate state correctly", () => {
    mutations[BAG_STORE.MUTATIONS.ADD_BAG_ITEM](state, mockItem[0])
    mutations[BAG_STORE.MUTATIONS.ADD_BAG_ITEM](state, mockItem[1])
    mutations[BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM](state, mockItem[0])

    expect(state).toMatchObject({
      bagItems: [mockItem[1]],
      totalPrice: mockItem[1].retail_price.value,
    })
  })
  it("should return getter correctly", () => {
    mutations[BAG_STORE.MUTATIONS.ADD_BAG_ITEM](state, mockItem[0])
    mutations[BAG_STORE.MUTATIONS.ADD_BAG_ITEM](state, mockItem[1])
    mutations[BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM](state, mockItem[0])

    expect(getters[BAG_STORE.GETTERS.BAG_ITEM_COUNT](state)).toBe(1)
  })
})