import {
  WishlistStateTypes,
  WishlistMutationsTypes,
  WishlistGettersTypes,
  WishlistActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type WishlistStoreModuleTypes<S = WishlistStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof WishlistMutationsTypes,
    P extends Parameters<WishlistMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<WishlistMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof WishlistGettersTypes]: ReturnType<WishlistGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof WishlistActionsTypes>(
    key: K,
    payload?: Parameters<WishlistActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<WishlistActionsTypes[K]>;
};
