import { Delay } from './Delay';

export interface BusStop {
  name: string;
  id: number;
  lat: number;
  lon: number;
}

export interface DelaysResponse {
  delay: Delay[];
}
