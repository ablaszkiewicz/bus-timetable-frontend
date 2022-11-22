import axios from 'axios';
import create from 'zustand';
import { BusStop } from './models/BusStop';

interface State {
  clickedStationId: string | null;
  setClickedStationId: (stationId: string) => void;
  clickedBusStop: BusStop | null;
  setClickedBusStop: (busStop: BusStop | null) => void;
  token: string;
  email: string;
  login: (email: string, token: string) => void;
}

export const useStore = create<State>((set) => ({
  clickedStationId: null,
  setClickedStationId: (stationId: string) => set({ clickedStationId: stationId }),
  clickedBusStop: null,
  setClickedBusStop: (busStop: BusStop | null) => set({ clickedBusStop: busStop }),
  token: '',
  email: '',
  login: (email: string, token: string) => set({ email, token }),
}));

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().token;
