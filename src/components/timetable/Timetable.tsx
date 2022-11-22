import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, SlideFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDelays } from '../../hooks/useDelays';
import { useStops } from '../../hooks/useStops';
import { BusStop } from '../../models/BusStop';
import { useStore } from '../../zustand';
import { DelayListItem } from './DelayListItem';

export const Timetable = () => {
  const [opened, setOpened] = useState(true);
  const [busStop, setBusStop] = useState<BusStop>();
  const clickedStationId = useStore((state) => state.clickedStationId);

  const { delaysQuery } = useDelays();
  const { getStopById } = useStops();

  useEffect(() => {
    setOpened(true);
    setBusStop(getStopById(+clickedStationId));
  }, [clickedStationId]);

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
      gap={2}
    >
      <Flex direction={'row'} justifyContent={'space-between'}>
        <Heading fontSize={'2xl'} mb={2}>
          {busStop?.name}
        </Heading>
        <IconButton aria-label='close' icon={<CloseIcon />} onClick={() => setOpened(false)} />
      </Flex>
      <Flex direction={'column'} w={'100%'} gap={2}>
        {delaysQuery.data?.map((delay) => (
          <DelayListItem delay={delay} />
        ))}
      </Flex>
    </Flex>
  );
};
