import { CircleMarker, MapContainer, Marker, Popup, SVGOverlay, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Flex } from '@chakra-ui/react';
import { useStops } from '../../hooks/useStops';
import L from 'leaflet';
import { useStore } from '../../zustand';
import MarkerClusterGroup from './MarkerClusterGroup';
import { useBuses } from '../../hooks/useBuses';

const busStopIcon = new L.Icon({
  iconUrl: 'bus-stop.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const busIcon = new L.Icon({
  iconUrl: 'bus.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const Map = () => {
  const { buses } = useBuses();
  const { stopsQuery } = useStops();
  const setClickedStationId = useStore((state) => state.setClickedStationId);
  const setClickedBusStop = useStore((state) => state.setClickedBusStop);
  const clickedStationId = useStore((state) => state.clickedStationId);
  const clickedBusStop = useStore((state) => state.clickedBusStop);

  const onBusStopClicked = (id: string) => {
    console.log('Clicked bus stop with id ' + id);
    setClickedStationId(id);
    setClickedBusStop(stopsQuery.data!.find((stop) => stop.id == +id)!);
  };

  return (
    <Flex w={'100%'} h={'100%'} backgroundColor={'gray.900'} overflow={'hidden'} position={'absolute'}>
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        center={[54.372, 18.638]}
        zoom={10}
        zoomControl={false}
      >
        <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
        <MarkerClusterGroup>
          {clickedBusStop == null &&
            stopsQuery.data?.map((stop) => (
              <Marker
                position={[stop.lat, stop.lon]}
                icon={busStopIcon}
                eventHandlers={{ click: () => onBusStopClicked(stop.id.toString()) }}
              >
                <Tooltip>{stop.name}</Tooltip>
              </Marker>
            ))}
          {clickedBusStop != null && (
            <Marker position={[clickedBusStop!.lat, clickedBusStop!.lon]} icon={busStopIcon}>
              <Tooltip>asd</Tooltip>
            </Marker>
          )}
        </MarkerClusterGroup>

        {clickedBusStop != null &&
          buses.map((bus) => (
            <Marker position={[bus.lat, bus.lon]} icon={busIcon}>
              <Tooltip>AUTOBUS</Tooltip>
            </Marker>
          ))}
      </MapContainer>
    </Flex>
  );
};
