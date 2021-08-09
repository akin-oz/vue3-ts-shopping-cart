import { createStore } from "vuex";
import { IRootState } from "@/store/interfaces";
import { BagStoreModuleTypes } from "./modules/bag/types";
import { WishlistStoreModuleTypes } from "./modules/wishlist/types";
import { RootStoreModuleTypes } from "./modules/root/types";

import root from "./modules/root";

export default createStore<IRootState>(root);

type StoreModules = {
  bagModule: BagStoreModuleTypes;
  wishlistModule: WishlistStoreModuleTypes;
  root: RootStoreModuleTypes;
};

export type Store = BagStoreModuleTypes<Pick<StoreModules, "bagModule">> &
  WishlistStoreModuleTypes<Pick<StoreModules, "wishlistModule">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
