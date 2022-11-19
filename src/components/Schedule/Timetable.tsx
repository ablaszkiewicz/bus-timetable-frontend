import { Flex, Heading, Text } from '@chakra-ui/react';
import { useDelays } from '../../hooks/useDelays';
import { DelayListItem } from '../DelayListItem';

export const Timetable = () => {
  const { delaysQuery } = useDelays();

  return (
    <Flex
      w={'100%'}
      grow={1}
      backgroundColor={'gray.900'}
      borderRadius={15}
      borderTopRadius={0}
      p={8}
      pt={4}
      direction={'column'}
      overflowY={'scroll'}
    >
      <Heading fontSize={'2xl'} ml={3} mb={2}>
        Arrivals
      </Heading>
      <Flex direction={'column'} w={'100%'} gap={2}>
        {delaysQuery.data?.map((delay) => (
          <DelayListItem delay={delay} />
        ))}
      </Flex>
    </Flex>
  );
};
