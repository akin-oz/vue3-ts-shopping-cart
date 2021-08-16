import ActivitiesService from '@/services/activities.service';
import { AllFilterParams, FilterQueryParams } from '@/types';
import { AxiosResponse } from 'axios'

export interface ApiTypes {
  [fn: string]: ((params: FilterQueryParams | AllFilterParams) => Promise<AxiosResponse>);
}

export default {
  getVenueActivities: ActivitiesService.getVenueActivities,
  getActivities: ActivitiesService.getActivities,
} as ApiTypes