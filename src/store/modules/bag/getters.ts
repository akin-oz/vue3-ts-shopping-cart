import { BAG_STORE } from "@/store/constants";
import { GetterTree } from "vuex";
import {
  BagGettersTypes,
  BagStateTypes,
  IRootState
} from "./../../interfaces";

export const getters: GetterTree<BagStateTypes, IRootState> &
  BagGettersTypes = {
  [BAG_STORE.GETTERS.BAG_ITEM_COUNT]: (state: BagStateTypes) => {
    return state.bagItems?.length ?? 0;
  },
};