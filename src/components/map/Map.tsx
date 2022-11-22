import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useStops } from '../../hooks/useStops';
import L, { Map as LeafletMap } from 'leaflet';
import { useStore } from '../../zustand';
import MarkerClusterGroup from './MarkerClusterGroup';
import { useBuses } from '../../hooks/useBuses';
import { useEffect, useState } from 'react';

const busStopIcon = new L.Icon({
  iconUrl: 'bus-stop.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const busIcon = new L.Icon({
  iconUrl: 'bus.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const Map = () => {
  const [map, setMap] = useState<LeafletMap>();
  const { buses } = useBuses();
  const { stopsQuery } = useStops();
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);
  const selectedBusStop = useStore((state) => state.clickedBusStop);

  useEffect(() => {
    if (selectedBusStop == null) {
      return;
    }

    map!.panTo([selectedBusStop!.lat, selectedBusStop!.lon]);
  }, [selectedBusStop]);

  const onBusStopClicked = (id: string) => {
    setSelectedBusStop(stopsQuery.data!.find((stop) => stop.id === +id)!);
  };

  return (
    <Flex w={'100%'} h={'100%'} backgroundColor={'gray.900'} overflow={'hidden'} position={'absolute'}>
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        center={[54.372, 18.638]}
        zoom={10}
        zoomControl={false}
        ref={setMap as any}
      >
        <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
        <MarkerClusterGroup>
          {selectedBusStop == null &&
            stopsQuery.data?.map((stop) => (
              <Marker
                position={[stop.lat, stop.lon]}
                icon={busStopIcon}
                eventHandlers={{ click: () => onBusStopClicked(stop.id.toString()) }}
              >
                <Box width={'100px'} height={'100px'} backgroundColor={'white'}></Box>
                <Tooltip>{stop.name}</Tooltip>
              </Marker>
            ))}
          {selectedBusStop != null && (
            <Marker position={[selectedBusStop!.lat, selectedBusStop!.lon]} icon={busStopIcon}>
              <Tooltip>{selectedBusStop.name}</Tooltip>
            </Marker>
          )}
        </MarkerClusterGroup>

        {selectedBusStop != null &&
          buses.map((bus) => <Marker position={[bus.lat, bus.lon]} icon={busIcon} title='asd'></Marker>)}
      </MapContainer>
    </Flex>
  );
};
