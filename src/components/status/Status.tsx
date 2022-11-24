import { Button, Flex, StatHelpText, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore, useStore } from '../../zustand';

export const Status = () => {
  const user = useAuthStore((state) => state.user);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Flex
      w={'100%'}
      bg='rgba(26, 32, 44, 0.7)'
      backdropFilter={'blur(10px)'}
      borderRadius={10}
      p={4}
      direction={'column'}
      zIndex={1}
      borderColor={'gray.700'}
      shadow={'lg'}
    >
      {!isLoggedIn && (
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex direction={'column'}>
            <Text fontSize={'sm'} opacity={0.8}>
              Not logged in
            </Text>
            <Text>Guest</Text>
          </Flex>
          <Button onClick={navigateToLoginPage}>Log in</Button>
        </Flex>
      )}
      {isLoggedIn && (
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex direction={'column'}>
            <Text fontSize={'sm'} opacity={0.8}>
              Logged in as
            </Text>
            <Text>{user?.email}</Text>
          </Flex>

          <Button onClick={logout}>Log out</Button>
        </Flex>
      )}
    </Flex>
  );
};
