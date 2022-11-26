import { Flex, SlideFade, Spinner, Text } from '@chakra-ui/react';
import { useStops } from '../../hooks/useStops';

export const LoadingStatus = () => {
  const { stopsWithinExtentQuery } = useStops();

  return (
    <Flex
      as={SlideFade}
      in={stopsWithinExtentQuery.isLoading}
      bg='rgba(26, 32, 44, 0.7)'
      backdropFilter={'blur(10px)'}
      borderRadius={10}
      p={4}
      direction={'row'}
      overflowY={'hidden'}
      zIndex={0}
      shadow={'lg'}
      gap={2}
      alignItems={'center'}
      position={'absolute'}
    >
      <Text>Loading</Text>
      <Spinner size={'sm'} />
    </Flex>
  );
};
