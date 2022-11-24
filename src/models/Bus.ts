export interface Bus {
  vehicleId: string;
  lat: number;
  lon: number;
  routeShortName: string;
  tripId: string;
  routeGeoJson?: {};
}
