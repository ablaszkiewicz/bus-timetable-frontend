import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Favourite } from './Favourite';

export const Favourites = () => {
  const { isLoggedIn, logout } = useAuth();
  const [items, setItems] = useState([0, 1]);

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
      <Button
        onClick={() => {
          setItems([...items, items.length]);
        }}
      >
        Add
      </Button>
      <Button
        onClick={() => {
          setItems(items.slice(1));
        }}
      >
        Remove
      </Button>

      {isLoggedIn && (
        <Flex direction={'column'} gap={2} w={'100%'}>
          <AnimatePresence mode='popLayout'>
            {items.map((item) => (
              <Flex
                as={motion.div}
                layout
                initial={{ scale: 0.8, opacity: 0, x: -50 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.8, opacity: 0, x: 20 }}
                transition={{ type: 'spring' }}
                key={item}
              >
                <Favourite busStop={{ name: 'Dworzec 1', id: 115, lat: 0, lon: 0 }} />
              </Flex>
            ))}
          </AnimatePresence>
        </Flex>
      )}
      {!isLoggedIn && <Text opacity={0.7}>Log in to save your favourite bus stops</Text>}
    </Flex>
  );
};
