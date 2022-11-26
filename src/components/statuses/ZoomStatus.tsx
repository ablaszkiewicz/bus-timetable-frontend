import { Flex, SlideFade } from '@chakra-ui/react';
import { ZOOM_TRESHOLD } from '../../hooks/useStops';
import { useStore } from '../../zustand';

export const ZoomStatus = () => {
  const zoom = useStore((state) => state.zoom);

  return (
    <Flex
      as={SlideFade}
      in={zoom < ZOOM_TRESHOLD}
      bg='rgba(26, 32, 44, 0.7)'
      backdropFilter={'blur(10px)'}
      borderRadius={10}
      p={4}
      direction={'column'}
      overflowY={'hidden'}
      zIndex={0}
      shadow={'lg'}
      gap={2}
      position={'absolute'}
    >
      Zoom in to see the stops
    </Flex>
  );
};
