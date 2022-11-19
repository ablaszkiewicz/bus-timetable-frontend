import { Flex, Heading } from '@chakra-ui/react';
import { Favourite } from './Favourite';

export const Favourites = () => {
  return (
    <Flex w={'50%'} h={'100%'} backgroundColor={'gray.900'} borderRadius={15} p={2} direction={'column'}>
      <Heading fontSize={'2xl'} ml={3} mb={2}>
        Saved
      </Heading>
      <Flex w={'100%'} flexDir={'column'} gap={2}>
        <Favourite busStop={{ name: 'Dworzec 1', id: 115 }} />
        <Favourite busStop={{ name: 'Dworzec 2', id: 116 }} />
      </Flex>
    </Flex>
  );
};
