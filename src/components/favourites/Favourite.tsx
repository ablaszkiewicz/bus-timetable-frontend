import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { BusStop } from '../../models/BusStop';
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { useStore } from '../../zustand';
import { BsTrashFill } from 'react-icons/bs';
import { useStops } from '../../hooks/useStops';
import { useState } from 'react';

interface Props {
  busStop: BusStop;
}

export const Favourite = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedBusStop = useStore((state) => state.setClickedBusStop);

  const { removeFavouriteStopMutation } = useStops();

  const dispatchNewStationId = () => {
    setSelectedBusStop(props.busStop);
  };

  const removeFromFavourites = () => {
    setIsLoading(true);
    removeFavouriteStopMutation.mutate(props.busStop.id);
  };

  return (
    <Flex
      direction={'row'}
      backgroundColor={'gray.800'}
      p={3}
      borderRadius={7}
      alignItems={'center'}
      w={'100%'}
      gap={2}
    >
      <Flex direction={'column'}>
        <Text>{props.busStop.name}</Text>
        <Text opacity={0.8} fontSize={'xs'}>
          {props.busStop.id}
        </Text>
      </Flex>
      <Spacer />
      <IconButton aria-label='Show' icon={<BsTrashFill />} onClick={removeFromFavourites} isLoading={isLoading} />
      <IconButton aria-label='Show' icon={<ArrowForwardIcon />} onClick={dispatchNewStationId} />
    </Flex>
  );
};
