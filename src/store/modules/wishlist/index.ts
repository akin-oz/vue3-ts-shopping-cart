import { Module } from "vuex";
import { WishlistStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
// import { actions } from "./actions";
// import { mutations } from "./mutations";
import { state } from "./state";

// Module
const wishlist: Module<WishlistStateTypes, IRootState> = {
  state,
  getters,
  // mutations,
  // actions
};

export default wishlist;