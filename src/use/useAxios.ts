
import { reactive, toRefs } from "vue";
import api from '@/services';
import { ActivitiesResponse, AllFilterParams, ApiErrorTypes, FilterQueryParams, UseAxiosTypes } from "@/types";


export function useAxios(fn: string, params: FilterQueryParams | AllFilterParams): UseAxiosTypes {
  const state = reactive({
    data: {} as ActivitiesResponse,
    loading: false as boolean,
    error: {} as ApiErrorTypes,
  });

  const getData = async () => {
    state.loading = true;
    state.error = {} as ApiErrorTypes;
    state.data = {} as ActivitiesResponse;

    try {
      const response = await api[fn](params)
      state.data = response.data;
      
    } catch (err) {
      state.error = err;
    }
    state.loading = false;
  };

  return {
    ...toRefs(state),
    getData
  };
}