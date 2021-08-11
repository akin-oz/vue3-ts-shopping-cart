import { ActionTree } from "vuex";
import {
  BagActionsTypes,
  BagStateTypes,
  IRootState,
  ItemData
} from "@/store/interfaces";
import { BAG_STORE } from "@/store/constants";

export const actions: ActionTree<BagStateTypes, IRootState> &
  BagActionsTypes = {
  [BAG_STORE.ACTIONS.ADD_BAG_ITEM]({ commit }, payload: ItemData) {
    commit(BAG_STORE.MUTATIONS.ADD_BAG_ITEM, payload);
  },
  [BAG_STORE.ACTIONS.REMOVE_BAG_ITEM]({ commit }, payload: ItemData) {
    commit(BAG_STORE.MUTATIONS.REMOVE_BAG_ITEM, payload);
  },
};