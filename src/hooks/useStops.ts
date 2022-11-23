import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { BusStop } from '../models/BusStop';
import { useAuth } from './useAuth';

export const STOPS_QUERY_KEY = 'stops';
export const FAVOURITE_STOPS_QUERY_KEY = 'favouriteStops';

export const useStops = () => {
  const [favouriteStops, setFavouriteStops] = useState<BusStop[]>([]);
  const { isLoggedIn } = useAuth();

  const getStops = async (): Promise<BusStop[]> => {
    const { data } = await axios.get(`stops`);
    return data;
  };

  const stopsQuery = useQuery({
    queryKey: [STOPS_QUERY_KEY],
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

    setFavouriteStops(favouriteStopsQuery.data!.map(getStopById) as BusStop[]);
  }, [stopsQuery.data, favouriteStopsQuery.data]);

  return { stopsQuery, getStopById, addFavouriteStopMutation, favouriteStops, removeFavouriteStopMutation };
};
