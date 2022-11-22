import { CircleMarker, MapContainer, Marker, Popup, SVGOverlay, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Flex } from '@chakra-ui/react';
import { useStops } from '../../hooks/useStops';
import L from 'leaflet';
import { useStore } from '../../zustand';
import MarkerClusterGroup from './MarkerClusterGroup';

const busIcon = new L.Icon({
  iconUrl: 'bus-icon.svg',
  shadowUrl: 'square-rounded.png',
  shadowSize: [30, 30],
  shadowAnchor: [15, 15],
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export const Map = () => {
  const { stopsQuery } = useStops();
  const setClickedStationId = useStore((state) => state.setClickedStationId);

  const onBusStopClicked = (id: string) => {
    console.log('Clicked bus stop with id ' + id);
    setClickedStationId(id);
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
          {stopsQuery.data?.map((stop) => (
            <Marker
              position={[stop.lat, stop.lon]}
              icon={busIcon}
              eventHandlers={{ click: () => onBusStopClicked(stop.id.toString()) }}
            >
              <Tooltip>{stop.name}</Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Flex>
  );
};
