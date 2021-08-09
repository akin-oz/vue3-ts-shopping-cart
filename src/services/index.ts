import VenueService from '@/services/venue.service';

interface ApiTypes {
  [fn: string]: Function;
}

export default {
  getActivities: VenueService.getActivities,
} as ApiTypes