import { ActionContext, DispatchOptions } from "vuex";
import { ROOT_STORE, BAG_STORE, WISHLIST_STORE } from "./constants";

export interface ItemData {
  uuid: string;
  cover_image_url: string;
  title: string;
  description: string;
  retail_price?: ItemPrice;
  original_retail_price?: ItemPrice;
  discount: number;
}

export interface IRootState {
  root: boolean;
  version: string;
  itemLists: ItemData[];
  itemCount: number;
}

export interface IMergedState extends IRootState {
  bagModule: BagStateTypes;
  wishlistModule: WishlistStateTypes;
}

export interface IRootGettersTypes {
  [ROOT_STORE.GETTERS.UPDATE_VERSION](state: IRootState): string;
}

export type RootMutationsTypes<S = IRootState> = {
  [ROOT_STORE.MUTATIONS.UPDATE_VERSION](state: S, payload: string): void;
  [ROOT_STORE.MUTATIONS.ITEM_LISTS](state: S, payload: ItemData[]): void;
  [ROOT_STORE.MUTATIONS.ITEM_COUNT](state: S, payload: number): void;
};

type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, "commit"> & {
    dispatch<K extends keyof StoreActions>(
      key: K,
      payload?: Parameters<StoreActions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<StoreActions[K]>;
  };

export interface RootActionsTypes {
  [ROOT_STORE.ACTIONS.UPDATE_VERSION](
    { commit }: AugmentedActionContextRoot,
    payload: string
  ): void;
  [ROOT_STORE.ACTIONS.ITEM_LISTS](
    { dispatch }: AugmentedActionContextRoot,
    payload: ItemData[]
  ): void;
  [ROOT_STORE.ACTIONS.ITEM_COUNT](
    { dispatch }: AugmentedActionContextRoot,
    payload: number
  ): void;
}
/*********************** BAG MODULE TYPES  ***********************/
export interface ItemPrice {
  currency?: string;
  value?: number;
  formatted_value?: string;
}
export interface Item {
  title?: string;
  description?: string;
  netPrice?: ItemPrice;
  retailPrice?: ItemPrice;
  discount?: number;
}
export interface BagStateTypes {
  bagItems?: Item[];
}

export interface BagGettersTypes {
  [BAG_STORE.GETTERS.TOTAL_PRICE](state: BagStateTypes): number;
  [BAG_STORE.GETTERS.BAG_ITEM_COUNT](state: BagStateTypes): number;
}
/*********************** WISHLIST MODULE TYPES  ***********************/

export interface WishlistStateTypes {
  wishlistItems?: Item[];
}

export interface WishlistGettersTypes {
  [WISHLIST_STORE.GETTERS.WISHLIST_ITEM_COUNT](state: WishlistStateTypes): number;
}

export interface StoreActions
  extends RootActionsTypes {}

export interface StoreGetters
  extends IRootGettersTypes,
    BagGettersTypes,
    WishlistGettersTypes {}