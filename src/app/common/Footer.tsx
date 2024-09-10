// app/components/Footer.tsx

'use client';

import { Box, Flex, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="blue.500" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="x1" color="white">2024 Lenarodo</Text>
      </Flex>
    </Box>
  )
}