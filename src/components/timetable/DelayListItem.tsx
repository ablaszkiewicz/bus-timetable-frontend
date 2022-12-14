import { Flex, Tag, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Delay } from '../../models/Delay';

interface Props {
  delay: Delay;
}

export const DelayListItem = (props: Props) => {
  return (
    <Flex
      as={motion.div}
      w={'100%'}
      backgroundColor={'gray.800'}
      direction={'row'}
      p={3}
      borderRadius={10}
      justifyContent={'space-between'}
    >
      <Flex gap={4}>
        <Tag variant={'subtle'}>{props.delay.routeId}</Tag>
        <Text opacity={0.8}>{props.delay.headsign}</Text>
      </Flex>
      <Flex gap={4}>
        <Text color={props.delay.delayInSeconds > 0 ? 'red.600' : 'green.600'} opacity={0.7}>
          {props.delay.delayInSeconds}s
        </Text>
        <Text>{props.delay.estimatedTime}</Text>
      </Flex>
    </Flex>
  );
};
