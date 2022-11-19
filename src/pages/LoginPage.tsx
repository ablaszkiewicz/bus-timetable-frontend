import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { googleLoginMutation } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginMutation.mutate((tokenResponse as any).access_token);
    },
  });

  return (
    <Flex w={'20%'} backgroundColor={'gray.700'} borderRadius={20} p={8} shadow={'xl'} flexDir={'column'} gap={4}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type='email' />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type='password' />
      </FormControl>
      <Button colorScheme={'teal'} onClick={() => login()}>
        Login
      </Button>
      <Button
        onClick={() => {
          setIsLoading(true);
          login();
        }}
        leftIcon={<FcGoogle />}
        isLoading={isLoading}
      >
        Login with Google
      </Button>
      <Text w={'100%'} textAlign={'center'} opacity={0.6} as={'u'} cursor={'pointer'} fontSize={'sm'}>
        Or continue without logging in
      </Text>
    </Flex>
  );
};
