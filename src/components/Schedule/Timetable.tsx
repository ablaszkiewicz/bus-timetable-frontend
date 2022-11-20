import { Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDelays } from '../../hooks/useDelays';
import { DelayListItem } from '../DelayListItem';

export const Timetable = () => {
  const { delaysQuery } = useDelays();

  return (
    <Flex p={4} h={'40%'} w={'50%'}>
      <Flex
        w={'100%'}
        grow={1}
        backgroundColor={'gray.900'}
        borderRadius={15}
        p={4}
        direction={'column'}
        overflowY={'scroll'}
        zIndex={0}
        borderColor={'gray.700'}
        borderWidth={6}
      >
        {/* <Heading fontSize={'2xl'} ml={3} mb={2}>
          Arrivals
        </Heading> */}
        <Flex direction={'column'} w={'100%'} gap={2}>
          {delaysQuery.data?.map((delay) => (
            <DelayListItem delay={delay} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
