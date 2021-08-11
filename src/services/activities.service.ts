import http from "@/services/http";
import { AxiosResponse } from 'axios'
import { AllFilterParams, FilterQueryParams } from '@/types';


export default {
  getVenueActivities: (props:AllFilterParams): Promise<AxiosResponse> =>  {
    return http.get(`venues/${props.id}/activities`, { params: props.params });
  },
  getActivities: (params: FilterQueryParams): Promise<AxiosResponse> => {
    return http.get(`activities`, { params })
  }
};