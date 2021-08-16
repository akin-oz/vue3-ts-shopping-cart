import { ItemData } from "@/store/interfaces";
import { Ref } from "vue";

export interface FilterQueryParams {
  limit: string | number;
  offset: string | number;
  venue_in: string;
}

export interface AllFilterParams {
  id: string;
  params: FilterQueryParams
}
export interface MetaData {
  count: number;
  match_type?: string;
  match_names?: string[];
  match_ids?: string[];
}

export interface ActivitiesResponse {
  meta: MetaData;
  data: Array<ItemData>;
}

export interface ApiErrorTypes {
  code: string;
  message: string;
}

export interface UseAxiosTypes {
  data: Ref<ActivitiesResponse>;
  loading: Ref<boolean>;
  error: Ref<ApiErrorTypes>;
  getData: () => Promise<void>;
}