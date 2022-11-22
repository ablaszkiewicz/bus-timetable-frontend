import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, SlideFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDelays } from '../../hooks/useDelays';
import { useStore } from '../../zustand';
import { DelayListItem } from './DelayListItem';

export const Timetable = () => {
  const [opened, setOpened] = useState(false);
  const selectedBusStop = useStore((state) => state.clickedBusStop);
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);

  const { delaysQuery } = useDelays();

  useEffect(() => {
    if (selectedBusStop == null) {
      return;
    }

    setOpened(true);
  }, [selectedBusStop]);

  const close = () => {
    setTimeout(() => {
      setSelectedBusStop(null);
    }, 100);

    setOpened(false);
  };

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
      overflowY={'hidden'}
      zIndex={0}
      shadow={'lg'}
      gap={2}
    >
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Heading fontSize={'2xl'} mb={2}>
          {selectedBusStop?.name}
        </Heading>
        <IconButton aria-label='close' icon={<CloseIcon />} onClick={() => close()} />
      </Flex>
      <Flex direction={'column'} w={'100%'} gap={2} overflowY={'scroll'}>
        {delaysQuery.data?.map((delay) => (
          <DelayListItem delay={delay} />
        ))}
      </Flex>
    </Flex>
  );
};
