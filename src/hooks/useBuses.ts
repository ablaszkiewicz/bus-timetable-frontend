import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Bus } from '../models/Bus';
import { useStore } from '../zustand';
import { useDelays } from './useDelays';

export const BUSES_QUERY_KEY = 'buses';
export const BUSES_QUERY_REFETCH_INTERVAL = 10000;

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const selectedBusStop = useStore((store) => store.clickedBusStop);

  const { delaysQuery } = useDelays();

  const busesQuery = useQuery({
    queryKey: [BUSES_QUERY_KEY, selectedBusStop?.id],
    enabled: !!selectedBusStop,
    queryFn: () => getBuses(),
    refetchInterval: BUSES_QUERY_REFETCH_INTERVAL,
  });

  useEffect(() => {
    setNewBuses();
  }, [busesQuery.data, delaysQuery.data]);

  const setNewBuses = async () => {
    const vehicleIds = delaysQuery.data?.map((delay) => delay.vehicleId);
    const filteredBuses = busesQuery.data?.filter((bus) => vehicleIds?.includes(bus.vehicleId));

    if (!filteredBuses) {
      setBuses([]);
      return;
    }

    const routePromises = filteredBuses!.map((bus) => getRouteForBus(bus));
    const routes = await Promise.all(routePromises);

    const busesWithRoutes = filteredBuses!.map((bus, index) => {
      return { ...bus, routeGeoJson: routes[index] };
    });

    setBuses(busesWithRoutes ?? []);
  };

  const getRouteForBus = async (bus: Bus) => {
    const today = dayjs.utc().format('YYYY-MM-DD');
    const { data } = await axios.get(
      `https://ckan2.multimediagdansk.pl/shapes?date=${today}&tripId=${bus.tripId}&routeId=${bus.routeShortName}`
    );

    return data;
  };

  const getBuses = async (): Promise<Bus[]> => {
    const { data } = await axios.get(`https://ckan2.multimediagdansk.pl/gpsPositions?v=2`);
    const buses = data.vehicles;

    return buses;
  };

  return { buses };
};
