import { Delay } from './Delay';

export interface BusStop {
  name: string;
  id: number;
}

export interface BusStopResponse {
  delay: Delay[];
}
