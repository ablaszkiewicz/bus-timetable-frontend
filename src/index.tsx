import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SchedulePage } from './pages/SchedulePage';
import { Root } from './Root';
import './style.css';

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

root.render(
  <GoogleOAuthProvider clientId='870055645934-kc6m3j3m7t512h1ve99cftf8faalupcr.apps.googleusercontent.com'>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
