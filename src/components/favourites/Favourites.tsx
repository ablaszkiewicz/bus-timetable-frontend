import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useStops } from '../../hooks/useStops';
import { Favourite } from './Favourite';

export const Favourites = () => {
  const { isLoggedIn } = useAuth();
  const { favouriteStops } = useStops();

  return (
    <Flex
      w={'100%'}
      grow={1}
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
        Favourites
      </Heading>

      {isLoggedIn && (
        <Flex direction={'column'} gap={2} w={'100%'}>
          <AnimatePresence mode='popLayout'>
            {favouriteStops.map((busStop) => (
              <Flex
                as={motion.div}
                layout
                initial={{ scale: 0.8, opacity: 0, x: -50 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: 20 }}
                transition={{ type: 'spring' }}
                key={busStop.id}
              >
                <Favourite busStop={busStop} />
              </Flex>
            ))}
          </AnimatePresence>
        </Flex>
      )}
      {!isLoggedIn && <Text opacity={0.7}>Log in to save your favourite bus stops</Text>}
    </Flex>
  );
};
