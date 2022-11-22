import { CircleMarker, MapContainer, Marker, Popup, SVGOverlay, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Flex } from '@chakra-ui/react';
import { useStops } from '../../../hooks/useStops';
import L from 'leaflet';

const busIcon = new L.Icon({
  iconUrl: 'bus-icon.svg',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const squareIcon = new L.Icon({
  iconUrl: 'square-rounded.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export const Map = () => {
  const { stopsQuery } = useStops();

  return (
    <Flex w={'100%'} h={'100%'} backgroundColor={'gray.900'} overflow={'hidden'} position={'absolute'}>
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        center={[54.372, 18.638]}
        zoom={10}
        zoomControl={false}
      >
        <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {stopsQuery.data?.map((stop) => (
          <>
            <Marker position={[stop.lat, stop.lon]} icon={squareIcon}>
              <Tooltip>{stop.name}</Tooltip>
            </Marker>
            <Marker position={[stop.lat, stop.lon]} icon={busIcon}>
              <Tooltip>{stop.name}</Tooltip>
            </Marker>
          </>
        ))}
      </MapContainer>
    </Flex>
  );
};
