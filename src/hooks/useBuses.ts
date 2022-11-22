import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Bus } from '../models/Bus';
import { DelaysResponse } from '../models/BusStop';
import { Delay } from '../models/Delay';
import { useStore } from '../zustand';
import { useDelays } from './useDelays';

export const BUSES_QUERY_KEY = 'buses';

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const busStopId = useStore((store) => store.clickedStationId);

  const { delaysQuery } = useDelays();

  const busesQuery = useQuery({
    queryKey: [BUSES_QUERY_KEY, busStopId],
    enabled: !!busStopId,
    queryFn: () => getBuses(),
    refetchInterval: 1000,
  });

  useEffect(() => {
    const vehicleIds = delaysQuery.data?.map((delay) => delay.vehicleId);
    const filteredBuses = busesQuery.data?.filter((bus) => vehicleIds?.includes(bus.vehicleId));
    setBuses(filteredBuses ?? []);

    console.log(filteredBuses);
  }, [busesQuery.data, delaysQuery.data]);

  const getBuses = async (): Promise<Bus[]> => {
    const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/gpsPositions?v=2`);
    const buses = data.vehicles;

    return buses;
  };

  const getBus = (vehicleId: string) => {
    return busesQuery.data?.find((bus) => bus.vehicleId === vehicleId);
  };

  return { buses };
};
