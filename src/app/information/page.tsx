'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react'
import { Image, Box, Flex, SimpleGrid, Spinner, Text, Button } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { GET_CHARACTERS } from '../lib/queries';
import { isAuthenticated } from '../lib/util';
import ItemModal from './ItemModal';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  }
  location: {
    name: string;
  };
}

interface CharactersData {
  characters: {
    info: {
      count: number;
      pages: number;
      next: number | null;
      prev: number | null;
    };
    results: Character[];
  }
}

interface CharactersVars {
  page: number;
}

const InformationPageWrapper = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const [page, setPage] = useState<number>(initialPage);
  const { data, loading, error } = useQuery<CharactersData, CharactersVars>(GET_CHARACTERS, { variables: { page }, });

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  const { next, prev } = data?.characters.info || {};

  const handleNextPage = () => {
    if (next) {
      setPage(next);
    }
  }

  const handlePrevPage = () => {
    if (prev) {
      setPage(prev);
    }
  };

  const handleCharacterClick = (character: Character) => {
    console.log(character)
    setSelectedCharacter(character);
    setIsModalOpen(true);
  }

  if (loading) return <Flex justify="center" mt={10}><Spinner size="xl" /></Flex>
  if (error) return <Text color="red.500">Error: {error.message}</Text>

  if (data?.characters.results.length === 0) {
    return <Text>No characters available for this page.</Text>;
  }

  return (isAuthenticated() &&
    <Box p={5}>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
        {data?.characters.results.map((character: Character) => (
          <Box key={character.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
            onClick={() => handleCharacterClick(character)}>
            <Image src={character.image} alt={character.name} borderRadius="md" />
            <Text mt={2} fontWeight="bold">{character.name}</Text>
            <Text>Species: {character.species}</Text>
            <Text>Status: {character.status}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Flex justify="center" mt={5}>
        <Button
          onClick={handlePrevPage}
          disabled={!prev}
          mr={2}
          colorScheme={!prev ? 'gray' : 'teal'}
          cursor={!prev ? 'not-allowed' : 'pointer'}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={!next}
          colorScheme={!next ? 'gray' : 'teal'}
          cursor={!next ? 'not-allowed' : 'pointer'}
        >
          Next
        </Button>
      </Flex>
      {selectedCharacter && (
        <ItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} character={selectedCharacter} />
      )}
    </Box>
  )
}

export default function InformationPage() {
  return <Suspense>
    <InformationPageWrapper />
  </Suspense>
}