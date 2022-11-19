import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Favourites } from '../components/Schedule/Favourites';
import { Search } from '../components/Schedule/Search';
import { Timetable } from '../components/Schedule/Timetable';
import { STOPS_QUERY_KEY, useDelays } from '../hooks/useDelays';

export const SchedulePage = () => {
  return (
    <Flex
      w={'50%'}
      h={'70%'}
      backgroundColor={'gray.700'}
      borderRadius={20}
      p={2}
      shadow={'xl'}
      flexDir={'row'}
      gap={2}
    >
      <Favourites />
      <Flex direction={'column'} h={'100%'} w={'100%'}>
        <Search />
        <Timetable />
      </Flex>
    </Flex>
  );
};
