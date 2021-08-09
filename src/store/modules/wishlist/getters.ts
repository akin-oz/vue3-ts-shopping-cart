import { WISHLIST_STORE } from "@/store/constants";
import { GetterTree } from "vuex";
import {
  WishlistGettersTypes,
  WishlistStateTypes,
  IRootState
} from "./../../interfaces";

export const getters: GetterTree<WishlistStateTypes, IRootState> &
  WishlistGettersTypes = {
  [WISHLIST_STORE.GETTERS.WISHLIST_ITEM_COUNT]: (state: WishlistStateTypes) => {
    return state.wishlistItems?.length ?? 0;
  },
};