import { Flex } from '@chakra-ui/react';
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete';
import { useEffect, useState } from 'react';
import { useStops } from '../../hooks/useStops';
import { useStore } from '../../zustand';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const selectedBusStop = useStore((state) => state.clickedBusStop);
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);

  const { allStopsQuery } = useStops();

  useEffect(() => {
    if (selectedBusStop == null) {
      setSearchInput('');
    } else {
      setSearchInput(selectedBusStop.name);
    }
  }, [selectedBusStop]);

  const dispatchBusStop = (name: string) => {
    const busStop = allStopsQuery?.data?.find((station) => (station as any).name === name);
    setSelectedBusStop(busStop!);
    setSearchInput(name);

    console.log(name);
  };

  return (
    <Flex w={'100%'} borderRadius={15} borderBottomRadius={0} direction={'column'} zIndex={1}>
      <AutoComplete onSelectOption={(option) => dispatchBusStop(option.item.label)} openOnFocus>
        <AutoCompleteInput
          w={'100%'}
          placeholder={'Enter bus stop name...'}
          backgroundColor={'gray.900'}
          shadow={'dark-lg'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <AutoCompleteList>
          {allStopsQuery?.data?.map((station) => (
            <AutoCompleteItem key={(station as any).id} value={(station as any).name ?? ''}>
              {(station as any).name}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Flex>
  );
};
