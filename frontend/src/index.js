import React from 'react';
import reactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';

axios.defaults.withCredentials = true;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
const root = reactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
      {process.env.MODE ? (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      ) : null}
    </QueryClientProvider>
  </Router>,
);
