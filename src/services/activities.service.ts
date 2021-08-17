import apiClient from "@/services/apiClient";
import { AxiosResponse } from 'axios'
import { AllFilterParams, FilterQueryParams } from '@/types';

const headers = () => {
  const locale: string = localStorage.getItem('locale') || 'it';
  return {
  'Accept-Language': locale === 'it' ? 'it-IT' : 'en-US',
}
}

export default {
  getVenueActivities: (props:AllFilterParams): Promise<AxiosResponse> =>  {
    return apiClient.get(`venues/${props.id}/activities`, { params: props.params, headers: headers() });
  },
  getActivities: (params: FilterQueryParams): Promise<AxiosResponse> => {
    return apiClient.get(`activities`, { params, headers: headers() });
  }
};