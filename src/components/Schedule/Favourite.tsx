import { Flex, IconButton, Spacer, TagRightIcon, Text } from '@chakra-ui/react';
import { BusStop } from '../../models/BusStop';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useStore } from '../../zustand';

interface Props {
  busStop: BusStop;
}

export const Favourite = (props: Props) => {
  const setStationId = useStore((state) => state.setStationId);

  const dispatchNewStationId = () => {
    setStationId(props.busStop.id.toString());
  };

  return (
    <Flex direction={'row'} backgroundColor={'gray.800'} p={3} borderRadius={7} alignItems={'center'}>
      <Flex direction={'column'}>
        <Text>{props.busStop.name}</Text>
        <Text opacity={0.8} fontSize={'xs'}>
          {props.busStop.id}
        </Text>
      </Flex>
      <Spacer />
      <IconButton aria-label='Show' icon={<ArrowForwardIcon />} onClick={dispatchNewStationId} />
    </Flex>
  );
};
