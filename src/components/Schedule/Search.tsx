import { Button, Flex, Input } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDelays } from '../../hooks/useDelays';
import { useStore } from '../../zustand';

export const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [stations, setStations] = useState([]);
  const stationId = useStore((state) => state.stationId);
  const setStationId = useStore((state) => state.setStationId);

  const { delaysQuery } = useDelays();

  useEffect(() => {
    initializeStations();
  }, []);

  useEffect(() => {
    setSearchValue(stationId);
  }, [stationId]);

  const initializeStations = async () => {
    const stationsTemp = await axios.get('https://a4d7543gl0.execute-api.eu-central-1.amazonaws.com/dev/stops');
    setStations(stationsTemp.data);
  };

  const dispatchStation = (name: string) => {
    const station = stations.find((station) => (station as any).name === name);
    setStationId((station as any).id);
    console.log(stationId);
  };

  return (
    <Flex w={'100%'} backgroundColor={'gray.900'} borderRadius={15} borderBottomRadius={0} p={4} direction={'row'}>
      <AutoComplete onChange={(stationName) => dispatchStation(stationName)}>
        <AutoCompleteInput />
        <AutoCompleteList>
          {stations.map((station) => (
            <AutoCompleteItem key={(station as any).id} value={(station as any).name ?? 'Chuj'}>
              {(station as any).name}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Flex>
  );
};
