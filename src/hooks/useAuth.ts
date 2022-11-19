import axios from 'axios';
import { useMutation } from 'react-query';
import { useStore } from '../zustand';

interface LoginResponse {
  email: string;
  token: string;
}

export const useAuth = () => {
  const login = useStore((state) => state.login);

  const googleLogin = async (token: string) => {
    const response = await axios.post('auth/google/login', { googleToken: token });
    return response.data;
  };

  const googleLoginMutation = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      login(response.email, response.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
      console.log(response.token, response.email);
    },
  });

  return { googleLoginMutation };
};
