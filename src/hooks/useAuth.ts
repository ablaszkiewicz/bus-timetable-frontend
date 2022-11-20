import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { CreateUserDto } from '../models/User';
import { useStore } from '../zustand';

interface LoginResponse {
  email: string;
  token: string;
}

export const useAuth = () => {
  const toast = useToast();
  const loginToStore = useStore((state) => state.login);

  const googleLogin = async (token: string) => {
    const response = await axios.post('auth/google/login', { googleToken: token });
    return response.data;
  };

  const register = async (dto: CreateUserDto) => {
    const response = await axios.post('auth/register', dto);
    return response.data;
  };

  const login = async (dto: CreateUserDto) => {
    const response = await axios.post('auth/login', dto);
    return response.data;
  };

  const googleLoginMutation = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
      toast({
        title: 'Logged in',
        status: 'success',
      });
    },
  });

  const registerMutation = useMutation(register, {
    onSuccess: async () => {
      toast({
        title: 'Account create.',
        description: "We've created your account for you",
        status: 'success',
      });
    },
  });

  const loginMutation = useMutation(login, {
    onSuccess: async (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      axios.defaults.headers.common['Authoization'] = 'Bearer ' + response.token;
      toast({
        title: 'Logged in',
        status: 'success',
      });
    },
    onError: async () => {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
      });
    },
  });

  return { googleLoginMutation, registerMutation, loginMutation };
};
