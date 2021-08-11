
import { ActionTree } from "vuex";
import { RootActionsTypes, IRootState, ItemData } from "@/store/interfaces";
import { ROOT_STORE } from "@/store/constants";

export const actions: ActionTree<IRootState, IRootState> & RootActionsTypes = {
  [ROOT_STORE.ACTIONS.UPDATE_VERSION]({ commit }, payload: string) {
    commit(ROOT_STORE.MUTATIONS.UPDATE_VERSION, payload);
  },
  [ROOT_STORE.ACTIONS.ITEM_LISTS]({ commit }, payload: ItemData[]) {
    commit(ROOT_STORE.MUTATIONS.ITEM_LISTS, payload);
  },
  [ROOT_STORE.ACTIONS.ITEM_COUNT]({ commit }, payload: number) {
    commit(ROOT_STORE.MUTATIONS.ITEM_COUNT, payload);
  },
};