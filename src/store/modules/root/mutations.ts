import { MutationTree } from "vuex";
import { RootMutationsTypes, IRootState, ItemData } from "./../../interfaces";
import { ROOT_STORE } from "@/store/constants";

export const mutations: MutationTree<IRootState> & RootMutationsTypes = {
  [ROOT_STORE.MUTATIONS.UPDATE_VERSION](state: IRootState, payload: string) {
    state.version = payload;
  },
  [ROOT_STORE.MUTATIONS.ITEM_LISTS](state: IRootState, payload: ItemData[]) {
    state.itemLists = payload;
  },
  [ROOT_STORE.MUTATIONS.ITEM_COUNT](state: IRootState, payload: number) {
    state.itemCount = payload;
  },
};