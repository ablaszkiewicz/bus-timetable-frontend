import axios from 'axios';
import create from 'zustand';
import { BusStop } from './models/BusStop';
import { User } from './models/User';

interface State {
  clickedBusStop: BusStop | null;
  setClickedBusStop: (busStop: BusStop | null) => void;
  user: User | null;
  login: (user: User | null) => void;
}

export const useStore = create<State>((set) => ({
  clickedBusStop: null,
  setClickedBusStop: (busStop: BusStop | null) => set({ clickedBusStop: busStop }),
  user: null,
  login: (user: User | null) => set({ user }),
}));

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().user?.token;
