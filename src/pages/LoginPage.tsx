import { Box, Button, Flex, FormControl, FormLabel, Input, Spacer, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { GrGithub } from 'react-icons/gr';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { googleLoginMutation, registerMutation, loginMutation } = useAuth();

  const register = () => {
    registerMutation.mutate({ email, password });
  };

  const login = () => {
    loginMutation.mutate({ email, password });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginMutation.mutate((tokenResponse as any).access_token);
    },
  });

  return (
    <Flex w={'40%'} backgroundColor={'gray.700'} borderRadius={20} p={6} shadow={'xl'} flexDir={'row'} gap={8}>
      <Flex w={'50%'} direction={'column'} gap={2}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme={'teal'} onClick={() => login()}>
          Login
        </Button>
        <Button colorScheme={'teal'} onClick={() => register()}>
          Register
        </Button>
      </Flex>
      <Flex w={'50%'} direction={'column'} gap={2}>
        <Button
          onClick={() => {
            setIsLoading(true);
            googleLogin();
          }}
          leftIcon={<FcGoogle />}
          isLoading={isLoading}
        >
          Continue with Google
        </Button>
        <Button
          onClick={() => {
            setIsLoading(true);
            googleLogin();
          }}
          leftIcon={<GrGithub />}
          isLoading={isLoading}
        >
          Continue with Github
        </Button>
        <Text w={'100%'} textAlign={'center'} opacity={0.6} as={'u'} cursor={'pointer'} fontSize={'sm'}>
          Or continue without logging in
        </Text>
      </Flex>
    </Flex>
  );
};
