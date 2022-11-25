import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BusStop } from '../models/BusStop';
import { useStore } from '../zustand';
import { useAuth } from './useAuth';

export const STOPS_QUERY_KEY = 'stops';
export const FAVOURITE_STOPS_QUERY_KEY = 'favouriteStops';
export const ZOOM_TRESHOLD = 15;

export const useStops = () => {
  const queryClient = useQueryClient();
  const [favouriteStops, setFavouriteStops] = useState<BusStop[]>([]);
  const { isLoggedIn } = useAuth();
  const bounds = useStore((state) => state.bounds);
  const zoom = useStore((state) => state.zoom);

  useEffect(() => {
    if (zoom < ZOOM_TRESHOLD) {
      queryClient.setQueriesData(STOPS_QUERY_KEY, []);
    }
  }, [zoom]);

  const getStops = async (): Promise<BusStop[]> => {
    const { data } = await axios.get(
      `stops/extent?xMin=${bounds.xMin}&xMax=${bounds.xMax}&yMin=${bounds.yMin}&yMax=${bounds.yMax}`
    );
    return data;
  };

  const stopsQuery = useQuery({
    queryKey: [STOPS_QUERY_KEY, bounds],
    enabled: zoom >= ZOOM_TRESHOLD,
    queryFn: () => getStops(),
  });

  const favouriteStopsQuery = useQuery({
    queryKey: [FAVOURITE_STOPS_QUERY_KEY],
    enabled: isLoggedIn,
    queryFn: () => getFavouriteStops(),
  });

  const getStopById = (id: number) => {
    return stopsQuery.data?.find((stop) => stop.id === id);
  };

  const getFavouriteStops = async (): Promise<number[]> => {
    const { data } = await axios.get('users/me/stops');
    return data;
  };

  const addFavouriteStop = async (id: number): Promise<number[]> => {
    const { data } = await axios.post('users/me/stops', { stopId: id });
    return data.favouriteStops;
  };

  const addFavouriteStopMutation = useMutation(addFavouriteStop, {
    onSuccess: () => {
      favouriteStopsQuery.refetch();
    },
  });

  const removeFavouriteStop = async (id: number): Promise<number[]> => {
    const { data } = await axios.delete(`users/me/stops/${id}`);
    return data.favouriteStops;
  };

  const removeFavouriteStopMutation = useMutation(removeFavouriteStop, {
    onSuccess: () => {
      favouriteStopsQuery.refetch();
    },
  });

  useEffect(() => {
    if (!favouriteStopsQuery.data) {
      return;
    }

    setFavouriteStops((favouriteStopsQuery.data!.map(getStopById) as BusStop[]).filter((stop) => stop != undefined));
  }, [stopsQuery.data, favouriteStopsQuery.data]);

  return { stopsQuery, getStopById, addFavouriteStopMutation, favouriteStops, removeFavouriteStopMutation };
};
