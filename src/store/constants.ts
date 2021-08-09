import { RootGetters, RootMutations, RootActions, BagGetters, WishlistGetters } from '@/store/enums';

export const ROOT_STORE = {
  GETTERS: RootGetters,
  MUTATIONS: RootMutations,
  ACTIONS: RootActions,
};

export const BAG_STORE = {
  GETTERS: BagGetters,
};

export const WISHLIST_STORE = {
  GETTERS: WishlistGetters,
};