'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Text, Button, Heading } from '@chakra-ui/react';
import { isAuthenticated } from '@/app/lib/util';
import Link from 'next/link';

export default function Welcome() {
  const router = useRouter();
  const isValidUser = isAuthenticated();

  useEffect(() => {
    if (!isValidUser) {
      router.push('/');
    }
  }, [router, isValidUser]);

  if (!isValidUser) {
    return null;
  }

  return (
    <Box p={6}>
      <Heading>Welcome to the Lenardo.ai!</Heading>
      <Text mb={6}>
        Leonardo.ai is an Australian technology start-up. Our AI-powered platform allows users to
        create production-quality visual assets with unprecedented quality, speed, and style.</Text>

      <Link href="/information" passHref>
        <Button colorScheme="teal" size="lg" px={8} borderRadius="full">
          Go to Information Page
        </Button>
      </Link>
    </Box>
  );
};