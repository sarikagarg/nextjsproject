// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </ApolloProvider>
  )
}