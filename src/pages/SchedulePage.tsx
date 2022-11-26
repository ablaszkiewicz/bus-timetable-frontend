import { Flex, Spacer } from '@chakra-ui/react';
import { Favourites } from '../components/favourites/Favourites';
import { Map } from '../components/map/Map';
import { Search } from '../components/search/Search';
import { Status } from '../components/status/Status';
import { Timetable } from '../components/timetable/Timetable';
import { ZoomStatus } from '../components/statuses/ZoomStatus';
import { LoadingStatus } from '../components/statuses/LoadingStatus';

export const SchedulePage = () => {
  return (
    <Flex w={'100%'} h={'100%'} position={'relative'}>
      <Map />
      <Flex w={'100%'} h={'100%'} flexDir={'row'} gap={4} p={4}>
        <Flex direction={'column'} h={'100%'} w={'20%'} gap={4}>
          <Favourites />
          <Status />
        </Flex>
        <Spacer />
        <Flex direction={'column'} h={'100%'} gap={4}>
          <ZoomStatus />
        </Flex>
        <Flex direction={'column'} h={'100%'} gap={4}>
          <LoadingStatus />
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
