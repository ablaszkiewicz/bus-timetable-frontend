import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { BusStop } from '../../models/BusStop';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useStore } from '../../zustand';
import { motion } from 'framer-motion';

interface Props {
  busStop: BusStop;
}

export const Favourite = (props: Props) => {
  const setStationId = useStore((state) => state.setClickedStationId);

  const dispatchNewStationId = () => {
    setStationId(props.busStop.id.toString());
  };

  return (
    <Flex as={motion.div} direction={'row'} backgroundColor={'gray.800'} p={3} borderRadius={7} alignItems={'center'}>
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
