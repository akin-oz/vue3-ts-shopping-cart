import { MutationTree } from "vuex";
import { WishlistMutationsTypes, WishlistStateTypes, ItemData } from "@/store/interfaces";
import { WISHLIST_STORE } from "@/store/constants";

export const mutations: MutationTree<WishlistStateTypes> &
  WishlistMutationsTypes = {
  [WISHLIST_STORE.MUTATIONS.ADD_WISHLIST_ITEM](state: WishlistStateTypes, payload: ItemData) {
    const alreadyAdded = state.wishlistItems.some(item => item.uuid === payload.uuid);
    if(!alreadyAdded) {
      state.wishlistItems = [
        ...state.wishlistItems,
        payload
      ];
    }
  },
  [WISHLIST_STORE.MUTATIONS.REMOVE_WISHLIST_ITEM](state: WishlistStateTypes, payload) {
    state.wishlistItems = state.wishlistItems.filter(item => item.uuid !== payload.uuid)
  },
};