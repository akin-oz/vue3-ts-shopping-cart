import { ActionTree } from "vuex";
import {
  WishlistActionsTypes,
  WishlistStateTypes,
  IRootState,
  ItemData
} from "@/store/interfaces";
import { WISHLIST_STORE } from "@/store/constants";

export const actions: ActionTree<WishlistStateTypes, IRootState> &
  WishlistActionsTypes = {
  [WISHLIST_STORE.ACTIONS.ADD_WISHLIST_ITEM]({ commit }, payload: ItemData) {
    commit(WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM, payload);
  },
  [WISHLIST_STORE.ACTIONS.REMOVE_WISHLIST_ITEM]({ commit }, payload: ItemData) {
    commit(WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM, payload);
  },
};