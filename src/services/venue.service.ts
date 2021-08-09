import http from "@/services/http";

interface FilterParams {
  limit?: string | number;
  offset?: string | number;
}

interface getVenueActivitiesTypes {
  id: string;
  params: FilterParams
}

export default {
  getActivities: (props:getVenueActivitiesTypes): Promise<any> =>  {
    return http.get(`venues/${props.id}/activities`, { params: props.params });
  },
};