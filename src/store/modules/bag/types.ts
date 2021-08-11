import {
  BagStateTypes,
  BagMutationsTypes,
  BagGettersTypes,
  BagActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type BagStoreModuleTypes<S = BagStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof BagMutationsTypes,
    P extends Parameters<BagMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<BagMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof BagGettersTypes]: ReturnType<BagGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof BagActionsTypes>(
    key: K,
    payload?: Parameters<BagActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<BagActionsTypes[K]>;
};
