import { Flex, Spacer } from '@chakra-ui/react';
import { Favourites } from '../components/Schedule/Favourites/Favourites';
import { Map } from '../components/Schedule/Map/Map';
import { Search } from '../components/Schedule/Search';
import { Timetable } from '../components/Schedule/Timetable';

export const SchedulePage = () => {
  return (
    <Flex w={'100%'} h={'100%'} position={'relative'}>
      <Map />
      <Flex w={'100%'} h={'100%'} flexDir={'row'} gap={2} justifyContent={'space-between'} p={4}>
        <Flex direction={'column'} h={'100%'} w={'20%'}>
          <Favourites />
        </Flex>
        <Flex direction={'column'} h={'100%'} w={'30%'}>
          <Search />
          <Spacer />
          <Timetable />
        </Flex>
      </Flex>
    </Flex>
  );
};
