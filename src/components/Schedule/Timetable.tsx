import { Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDelays } from '../../hooks/useDelays';
import { DelayListItem } from '../DelayListItem';

export const Timetable = () => {
  const { delaysQuery } = useDelays();

  return (
    <Flex
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
      <Flex direction={'column'} w={'100%'} gap={2}>
        {delaysQuery.data?.map((delay) => (
          <DelayListItem delay={delay} />
        ))}
      </Flex>
    </Flex>
  );
};
