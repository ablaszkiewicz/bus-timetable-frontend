import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, SlideFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStore } from '../../zustand';

export const BusStopPanel = () => {
  const [opened, setOpened] = useState(true);
  const selectedBusStop = useStore((state) => state.clickedBusStop);

  useEffect(() => {
    setOpened(true);
  }, [selectedBusStop]);

  return (
    <Flex
      as={SlideFade}
      in={opened}
      h={'40%'}
      w={'100%'}
      bg='rgba(26, 32, 44, 0.7)'
      backdropFilter={'blur(10px)'}
      borderRadius={10}
      p={4}
      direction={'column'}
      overflowY={'scroll'}
      zIndex={0}
      shadow={'lg'}
    >
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Heading fontSize={'2xl'} mb={2}>
          Bus stop information
        </Heading>
        <IconButton aria-label='close' icon={<CloseIcon />} onClick={() => setOpened(false)} />
      </Flex>
    </Flex>
  );
};
