import axios from 'axios';
import { useQuery } from 'react-query';
import { BusStop } from '../models/BusStop';

export const STOPS_QUERY_KEY = 'stops';

export const useStops = () => {
  const getStops = async (): Promise<BusStop[]> => {
    const { data } = await axios.get(`stops`);
    return data;
  };

  const stopsQuery = useQuery({
    queryKey: [STOPS_QUERY_KEY],
    queryFn: () => getStops(),
  });

  const getStopById = (id: number) => {
    return stopsQuery.data?.find((stop) => stop.id === id);
  };

  return { stopsQuery, getStopById };
};
