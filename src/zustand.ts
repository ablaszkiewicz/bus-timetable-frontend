import axios from 'axios';
import create from 'zustand';
import { BusStop } from './models/BusStop';
import { User } from './models/User';
import { persist } from 'zustand/middleware';

interface Bounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface State {
  clickedBusStop: BusStop | null;
  setClickedBusStop: (busStop: BusStop | null) => void;
  bounds: Bounds;
  setBounds: (bounds: Bounds) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

interface AuthState {
  user: User | null;
  login: (user: User | null) => void;
}

export const useStore = create<State>((set) => ({
  clickedBusStop: null,
  setClickedBusStop: (busStop: BusStop | null) => set({ clickedBusStop: busStop }),
  bounds: { xMax: 0, xMin: 0, yMax: 0, yMin: 0 },
  setBounds: (bounds: Bounds) => set({ bounds: bounds }),
  zoom: 0,
  setZoom: (zoom: number) => set({ zoom: zoom }),
}));

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    login: (user: User | null) => set({ user }),
  }))
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user?.token;
