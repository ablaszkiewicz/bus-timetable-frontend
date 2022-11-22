import axios from 'axios';
import { useQuery } from 'react-query';
import { DelaysResponse } from '../models/BusStop';
import { Delay } from '../models/Delay';
import { useStore } from '../zustand';

export const DELAYS_QUERY_KEY = 'delays';

export const useDelays = () => {
  const selectedBusStop = useStore((store) => store.clickedBusStop);

  const getDelaysForStop = async (stopId: number): Promise<Delay[]> => {
    const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/delays?stopId=${stopId}`);
    return (data as DelaysResponse).delay;
  };

  const delaysQuery = useQuery({
    queryKey: [DELAYS_QUERY_KEY, selectedBusStop],
    enabled: selectedBusStop != null,
    queryFn: () => getDelaysForStop(selectedBusStop!.id),
    refetchInterval: 1000,
  });

  return { delaysQuery };
};
