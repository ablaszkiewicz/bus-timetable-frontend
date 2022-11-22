import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <Flex height={'100vh'} width={'100vw'} alignItems={'center'} justifyContent={'center'}>
      <Outlet />
    </Flex>
  );
};
