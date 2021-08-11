import {
  RootGetters,
  RootMutations,
  RootActions,
  BagGetters,
  WishlistGetters,
  BagActions,
  WishlistActions,
  BagMutations,
  WishlistMutations,
} from '@/store/enums';

export const ROOT_STORE = {
  GETTERS: RootGetters,
  MUTATIONS: RootMutations,
  ACTIONS: RootActions,
};

export const BAG_STORE = {
  GETTERS: BagGetters,
  MUTATIONS: BagMutations,
  ACTIONS: BagActions,
};

export const WISHLIST_STORE = {
  GETTERS: WishlistGetters,
  MUTATIONS: WishlistMutations,
  ACTIONS: WishlistActions,
};