import {
  BagStateTypes,
  // BagMutationsTypes,
  BagGettersTypes,
  // BagActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore } from "vuex";

export type BagStoreModuleTypes<S = BagStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  getters: {
    [K in keyof BagGettersTypes]: ReturnType<BagGettersTypes[K]>;
  };
};