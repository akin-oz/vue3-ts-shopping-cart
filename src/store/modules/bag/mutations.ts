import { MutationTree } from "vuex";
import { BagMutationsTypes, BagStateTypes, ItemData } from "@/store/interfaces";
import { BAG_STORE } from "@/store/constants";

export const mutations: MutationTree<BagStateTypes> &
  BagMutationsTypes = {
  [BAG_STORE.MUTATIONS.ADD_BAG_ITEM](state: BagStateTypes, payload: ItemData) {
    const alreadyAdded = state.bagItems?.some(item => item.uuid === payload.uuid);
    if(!alreadyAdded) {
      state.bagItems = [
        ...state.bagItems,
        payload
      ];
      state.totalPrice = state.totalPrice + (payload.retail_price?.value ?? 0);
    }
  },
  [BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM](state: BagStateTypes, payload) {
    state.bagItems.filter(item => item.uuid !== payload.uuid)
    state.totalPrice = state.totalPrice - (payload.retail_price?.value ?? 0);
  },
};