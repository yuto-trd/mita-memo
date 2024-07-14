'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProgressBar } from 'next-nprogress-bar';
import theme from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
      <AppProgressBar
        height='2px'
        color='var(--chakra-colors-blue-500)'
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ChakraProvider>
  );
}
