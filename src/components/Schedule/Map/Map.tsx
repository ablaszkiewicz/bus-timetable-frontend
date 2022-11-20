import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Flex } from '@chakra-ui/react';

export const Map = () => {
  return (
    <Flex
      w={'100%'}
      h={'100%'}
      grow={1}
      backgroundColor={'gray.900'}
      borderRadius={15}
      overflow={'hidden'}
      position={'absolute'}
    >
      <MapContainer
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        center={[51.505, -0.09]}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Flex>
  );
};
