import axios from 'axios';
import create from 'zustand';

interface State {
  clickedStationId: string;
  setClickedStationId: (stationId: string) => void;
  token: string;
  email: string;
  login: (email: string, token: string) => void;
}

export const useStore = create<State>((set) => ({
  clickedStationId: '',
  setClickedStationId: (stationId: string) => set({ clickedStationId: stationId }),
  token: '',
  email: '',
  login: (email: string, token: string) => set({ email, token }),
}));

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().token;
