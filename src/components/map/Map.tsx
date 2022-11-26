import { MapContainer, Marker, Popup, SVGOverlay, TileLayer, Tooltip, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useStops } from '../../hooks/useStops';
import L, { Map as LeafletMap } from 'leaflet';
import { useStore } from '../../zustand';
import MarkerClusterGroup from './MarkerClusterGroup';
import { useBuses } from '../../hooks/useBuses';
import { Fragment, useEffect, useRef, useState } from 'react';
import { BusStop } from '../../models/BusStop';

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
  const { stopsWithinExtentQuery } = useStops();
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);
  const selectedBusStop = useStore((state) => state.clickedBusStop);
  const setBounds = useStore((state) => state.setBounds);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const setZoom = useStore((state) => state.setZoom);

  useEffect(() => {
    if (stopsWithinExtentQuery.data) {
      setBusStops(stopsWithinExtentQuery.data);
    }
  }, [stopsWithinExtentQuery.data]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on('moveend', (e) => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      setZoom(zoom);
      console.log(zoom);
      setBounds({
        xMin: bounds.getSouthWest().lng - 0.005,
        xMax: bounds.getNorthEast().lng + 0.005,
        yMin: bounds.getSouthWest().lat - 0.005,
        yMax: bounds.getNorthEast().lat + 0.005,
      });
    });

    return () => {
      map.off('moveend');
    };
  }, [map]);

  useEffect(() => {
    if (selectedBusStop == null) {
      return;
    }

    map!.panTo([selectedBusStop!.lat, selectedBusStop!.lon]);
  }, [selectedBusStop]);

  const onBusStopClicked = (id: string) => {
    console.log(map!.getBounds());
    setSelectedBusStop(stopsWithinExtentQuery.data!.find((stop) => stop.id === +id)!);
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
        {selectedBusStop == null &&
          busStops.map((stop) => (
            <Marker
              key={stop.id}
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

        {selectedBusStop != null &&
          buses.map((bus) => (
            <Fragment key={bus.vehicleId}>
              <GeoJSON data={bus.routeGeoJson! as any} />
              <Marker position={[bus.lat, bus.lon]} icon={busIcon} />
              <Marker
                position={[bus.lat, bus.lon]}
                icon={
                  new L.DivIcon({
                    iconSize: [0, 0],
                    iconAnchor: [16, -2],
                    html: `<p style="width: 30px; margin-top: 15px; text-align: center; font-weight: bold; font-size: 1.2em; background-color: white; color: black; border-radius: 5px">${bus.routeShortName}</p>`,
                  })
                }
              />
            </Fragment>
          ))}
      </MapContainer>
    </Flex>
  );
};
