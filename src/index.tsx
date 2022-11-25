import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import dayjs from 'dayjs';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SchedulePage } from './pages/SchedulePage';
import { Root } from './Root';
import './style.css';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '',
        element: <SchedulePage />,
      },
    ],
  },
]);

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://localhost:3001';
//axios.defaults.baseURL = 'https://a4d7543gl0.execute-api.eu-central-1.amazonaws.com/dev';

if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://a4d7543gl0.execute-api.eu-central-1.amazonaws.com/dev';
}

root.render(
  <GoogleOAuthProvider clientId='870055645934-kc6m3j3m7t512h1ve99cftf8faalupcr.apps.googleusercontent.com'>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
