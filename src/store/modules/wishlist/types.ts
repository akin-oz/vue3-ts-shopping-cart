import {
  WishlistStateTypes,
  // WishlistMutationsTypes,
  WishlistGettersTypes,
  // WishlistActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore } from "vuex";

export type WishlistStoreModuleTypes<S = WishlistStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  getters: {
    [K in keyof WishlistGettersTypes]: ReturnType<WishlistGettersTypes[K]>;
  };
};