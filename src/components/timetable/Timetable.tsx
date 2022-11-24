import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, SlideFade, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDelays } from '../../hooks/useDelays';
import { useStops } from '../../hooks/useStops';
import { useStore } from '../../zustand';
import { DelayListItem } from './DelayListItem';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuth } from '../../hooks/useAuth';

export const Timetable = () => {
  const [opened, setOpened] = useState(false);
  const selectedBusStop = useStore((state) => state.clickedBusStop);
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);

  const { isLoggedIn } = useAuth();

  const { delaysQuery } = useDelays();
  const { addFavouriteStopMutation, favouriteStops } = useStops();

  useEffect(() => {
    if (selectedBusStop == null) {
      return;
    }

    setOpened(true);
  }, [selectedBusStop]);

  const close = () => {
    setTimeout(() => {
      setSelectedBusStop(null);
    }, 300);

    setOpened(false);
  };

  const addFavourite = () => {
    addFavouriteStopMutation.mutate(selectedBusStop!.id);
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
        <Flex gap={2}>
          {favouriteStops.some((busStop) => busStop.id == selectedBusStop?.id) && (
            <IconButton aria-label='close' icon={<AiFillHeart />} disabled />
          )}
          {!favouriteStops.some((busStop) => busStop.id == selectedBusStop?.id) && (
            <IconButton
              aria-label='close'
              icon={<AiOutlineHeart />}
              isLoading={addFavouriteStopMutation.isLoading}
              onClick={() => addFavourite()}
              disabled={!isLoggedIn}
            />
          )}

          <IconButton aria-label='close' icon={<CloseIcon fontSize={'xs'} />} onClick={() => close()} />
        </Flex>
      </Flex>
      <Flex direction={'column'} w={'100%'} gap={2} overflowY={'scroll'}>
        {delaysQuery.data?.map((delay) => (
          <DelayListItem key={delay.vehicleId + ' ' + delay.routeId} delay={delay} />
        ))}
        {delaysQuery.data?.length === 0 && (
          <Text fontSize={'xl'} textAlign={'center'} w={'100%'} opacity={0.6}>
            No buses
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
