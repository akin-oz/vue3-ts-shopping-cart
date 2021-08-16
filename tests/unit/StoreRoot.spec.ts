import { actions } from "@/store/modules/root/actions"
import { state } from "@/store/modules/root/state"
import { mutations } from "@/store/modules/root/mutations"
import { getters } from "@/store/modules/root/getters"
import * as store from '@/store/modules/root'
import { ROOT_STORE } from "@/store/constants";
import mockItem from '../mocks/productItem.json';

describe("MUTATIONS", () => {
  it("should render root module correctly", () => {
    expect(store.default).toMatchObject({
      state,
      getters,
      mutations,
      actions,
    })
  })
  it("should mutate state correctly", () => {
    mutations[ROOT_STORE.MUTATIONS.UPDATE_VERSION](state, "0.1.1")
    mutations[ROOT_STORE.MUTATIONS.ITEM_LISTS](state, mockItem)
    mutations[ROOT_STORE.MUTATIONS.ITEM_COUNT](state, 79)

    expect(state).toMatchObject({
      version: "0.1.1",
      itemLists: mockItem,
      itemCount: 79
    })
  })
  it("should return getter correctly", () => {
    mutations[ROOT_STORE.MUTATIONS.UPDATE_VERSION](state, "0.1.1")

    expect(getters[ROOT_STORE.GETTERS.UPDATE_VERSION](state)).toBe('0.1.1');
  })
})