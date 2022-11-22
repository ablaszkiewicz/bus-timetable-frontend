import axios from 'axios';
import { useQuery } from 'react-query';
import { DelaysResponse } from '../models/BusStop';
import { Delay } from '../models/Delay';
import { useStore } from '../zustand';

export const DELAYS_QUERY_KEY = 'delays';

export const useDelays = () => {
  const stationId = useStore((store) => store.clickedStationId);

  const getDelaysForStop = async (stopId: string): Promise<Delay[]> => {
    const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/delays?stopId=${stopId}`);
    return (data as DelaysResponse).delay;
  };

  const delaysQuery = useQuery({
    queryKey: [DELAYS_QUERY_KEY, stationId],
    enabled: !!stationId,
    queryFn: () => getDelaysForStop(stationId),
    refetchInterval: 1000,
  });

  return { delaysQuery };
};
