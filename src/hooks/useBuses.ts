import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Bus } from '../models/Bus';
import { useStore } from '../zustand';
import { useDelays } from './useDelays';

export const BUSES_QUERY_KEY = 'buses';

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const selectedBusStop = useStore((store) => store.clickedBusStop);

  const { delaysQuery } = useDelays();

  const busesQuery = useQuery({
    queryKey: [BUSES_QUERY_KEY, selectedBusStop?.id],
    enabled: !!selectedBusStop,
    queryFn: () => getBuses(),
    refetchInterval: 1000,
  });

  useEffect(() => {
    const vehicleIds = delaysQuery.data?.map((delay) => delay.vehicleId);
    const filteredBuses = busesQuery.data?.filter((bus) => vehicleIds?.includes(bus.vehicleId));
    setBuses(filteredBuses ?? []);
  }, [busesQuery.data, delaysQuery.data]);

  const getBuses = async (): Promise<Bus[]> => {
    const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/gpsPositions?v=2`);
    const buses = data.vehicles;

    return buses;
  };

  return { buses };
};
