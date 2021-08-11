import { Module } from "vuex";
import { BagStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const bag: Module<BagStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default bag;