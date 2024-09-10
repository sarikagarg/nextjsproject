// app/components/Header.tsx

'use client';

import { Flex, Spacer, Text } from '@chakra-ui/react';
import UserDetails from './UserDetails';

export default function Header() {

  return (
    <Flex as="header" bg="blue.600" color="white" p={4} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        Leonardo.ai
      </Text>
      <Spacer />
      <UserDetails />
    </Flex>
  )
}