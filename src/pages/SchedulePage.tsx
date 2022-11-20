import { Flex, Spacer } from '@chakra-ui/react';
import { Favourites } from '../components/Schedule/Favourites/Favourites';
import { Map } from '../components/Schedule/Map/Map';
import { Search } from '../components/Schedule/Search';
import { Timetable } from '../components/Schedule/Timetable';

export const SchedulePage = () => {
  return (
    <Flex
      w={'50%'}
      h={'70%'}
      backgroundColor={'gray.700'}
      borderRadius={10}
      p={2}
      shadow={'xl'}
      flexDir={'row'}
      gap={2}
    >
      <Favourites />
      <Flex direction={'column'} h={'100%'} w={'100%'} position={'relative'}>
        <Map />
        <Search />
        <Spacer />
        <Timetable />
      </Flex>
    </Flex>
  );
};
