import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CreateUserDto } from '../models/User';
import { useStore } from '../zustand';

interface LoginResponse {
  email: string;
  token: string;
}

export const useAuth = () => {
  const toast = useToast();
  const loginToStore = useStore((state) => state.login);
  const navigate = useNavigate();

  const googleLogin = async (token: string) => {
    const response = await axios.post('auth/google/login', { googleToken: token });
    return response.data;
  };

  const githubLogin = async (code: string) => {
    const response = await axios.post('auth/github/login', { code });
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
      onSuccessfulLogin(response);
    },
  });

  const githubLoginMutation = useMutation(githubLogin, {
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
  });

  const registerMutation = useMutation(register, {
    onSuccess: async () => {
      toast({
        title: 'Account created.',
        description: "We've created an account for you",
        status: 'success',
        duration: 2000,
      });
    },
  });

  const loginMutation = useMutation(login, {
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
    onError: async () => {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
      });
    },
  });

  const onSuccessfulLogin = (response: LoginResponse) => {
    loginToStore({ email: response.email, token: response.token });
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
    toast({
      title: 'Logged in',
      status: 'success',
      duration: 2000,
    });
    navigate('/');
  };

  const isLoggedIn = useStore((state) => state.user != null);

  const logout = () => {
    loginToStore(null);
    toast({
      title: 'Logged out',
      status: 'success',
      duration: 2000,
    });
  };

  return { googleLoginMutation, githubLoginMutation, registerMutation, loginMutation, isLoggedIn, logout };
};
