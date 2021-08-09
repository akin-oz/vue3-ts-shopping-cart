import { BAG_STORE } from "@/store/constants";
import { GetterTree } from "vuex";
import {
  BagGettersTypes,
  BagStateTypes,
  IRootState
} from "./../../interfaces";

export const getters: GetterTree<BagStateTypes, IRootState> &
  BagGettersTypes = {
  [BAG_STORE.GETTERS.TOTAL_PRICE]: (state: BagStateTypes) => {
    return state.bagItems?.reduce((acc,cur) => {
      const currentPrice = cur?.retailPrice?.value ?? 0;
      return acc + currentPrice;
    },0) ?? 0
  },
  [BAG_STORE.GETTERS.BAG_ITEM_COUNT]: (state: BagStateTypes) => {
    return state.bagItems?.length ?? 0;
  },
};