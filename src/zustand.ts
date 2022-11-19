import axios from 'axios';
import create from 'zustand';

interface State {
  stationId: string;
  setStationId: (stationId: string) => void;
  token: string;
  email: string;
  login: (email: string, token: string) => void;
}

export const useStore = create<State>((set) => ({
  stationId: '',
  setStationId: (stationId: string) => set({ stationId }),
  token: '',
  email: '',
  login: (email: string, token: string) => set({ email, token }),
}));

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().token;
