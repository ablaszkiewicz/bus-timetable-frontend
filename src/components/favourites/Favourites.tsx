import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { Favourite } from './Favourite';

export const Favourites = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      bg='rgba(26, 32, 44, 0.7)'
      backdropFilter={'blur(10px)'}
      borderRadius={10}
      p={4}
      direction={'column'}
      zIndex={1}
      borderColor={'gray.700'}
      shadow={'lg'}
    >
      <Heading fontSize={'2xl'} mb={2}>
        Saved
      </Heading>
      {isLoggedIn && (
        <Flex w={'100%'} flexDir={'column'} gap={2}>
          <Favourite busStop={{ name: 'Dworzec 1', id: 115, lat: 0, lon: 0 }} />
          <Favourite busStop={{ name: 'Dworzec 2', id: 116, lat: 0, lon: 0 }} />
        </Flex>
      )}
      {!isLoggedIn && <Text opacity={0.7}>Log in to save your favourite bus stops</Text>}
    </Flex>
  );
};
