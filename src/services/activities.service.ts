import apiClient from "@/services/apiClient";
import { AxiosResponse } from 'axios'
import { AllFilterParams, FilterQueryParams } from '@/types';


export default {
  getVenueActivities: (props:AllFilterParams): Promise<AxiosResponse> =>  {
    return apiClient.get(`venues/${props.id}/activities`, { params: props.params });
  },
  getActivities: (params: FilterQueryParams): Promise<AxiosResponse> => {
    return apiClient.get(`activities`, { params })
  }
};