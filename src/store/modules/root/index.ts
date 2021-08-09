import { Module, ModuleTree } from "vuex";
import { IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import bagModule from "../bag";
import wishlistModule from "../wishlist";

// Modules
const modules: ModuleTree<IRootState> = {
  bagModule,
  wishlistModule,
};

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;