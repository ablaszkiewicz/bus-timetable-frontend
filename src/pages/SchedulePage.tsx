import { Flex, Spacer } from '@chakra-ui/react';
import { BusStopPanel } from '../components/bus-stop-info/BusStopPanel';
import { Favourites } from '../components/favourites/Favourites';
import { Map } from '../components/map/Map';
import { Search } from '../components/search/Search';
import { Timetable } from '../components/timetable/Timetable';

export const SchedulePage = () => {
  return (
    <Flex w={'100%'} h={'100%'} position={'relative'}>
      <Map />
      <Flex w={'100%'} h={'100%'} flexDir={'row'} gap={4} p={4}>
        <Flex direction={'column'} h={'100%'} w={'20%'}>
          <Favourites />
        </Flex>
        <Spacer />
        <Flex direction={'column'} h={'100%'} w={'30%'}>
          <Search />
          <Spacer />
          <Timetable />
        </Flex>
      </Flex>
    </Flex>
  );
};
