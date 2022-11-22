import axios from 'axios';
import { useQuery } from 'react-query';
import { BusStop, BusStopResponse } from '../models/BusStop';
import { Delay } from '../models/Delay';
import { useStore } from '../zustand';

export const STOPS_QUERY_KEY = 'stops';

export const useStops = () => {
  const stationId = useStore((store) => store.stationId);

  const getStops = async (): Promise<BusStop[]> => {
    const { data } = await axios.get(`stops`);
    return data;
  };

  const stopsQuery = useQuery({
    queryKey: [STOPS_QUERY_KEY],
    queryFn: () => getStops(),
  });

  return { stopsQuery };
};
