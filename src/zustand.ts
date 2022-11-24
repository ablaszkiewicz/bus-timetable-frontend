import axios from 'axios';
import create from 'zustand';
import { BusStop } from './models/BusStop';
import { User } from './models/User';
import { persist } from 'zustand/middleware';

interface State {
  clickedBusStop: BusStop | null;
  setClickedBusStop: (busStop: BusStop | null) => void;
}

interface AuthState {
  user: User | null;
  login: (user: User | null) => void;
}

export const useStore = create<State>((set) => ({
  clickedBusStop: null,
  setClickedBusStop: (busStop: BusStop | null) => set({ clickedBusStop: busStop }),
}));

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
    user: null,
    login: (user: User | null) => set({ user }),
  }))
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useAuthStore.getState().user?.token;
