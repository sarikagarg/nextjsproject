'use client';

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Image, Text } from "@chakra-ui/react";
import { useQuery } from '@apollo/client';

import { GET_CHARACTER_DETAIL } from '../lib/queries';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  }
}

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character;
}

export default function ItemModal({ isOpen, onClose, character }: ItemModalProps) {

  const { data, loading, error } = useQuery(GET_CHARACTER_DETAIL, {
    variables: { id: character.id },
    skip: !isOpen,
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text color="red.500">Error: {error.message}</Text>

  const detailedCharacter = data?.character || character;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            {detailedCharacter.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Image src={detailedCharacter.image} alt={detailedCharacter.name} borderRadius="md" />
              <Text>Species: {detailedCharacter.species}</Text>
              <Text>Status: {detailedCharacter.status}</Text>
              <Text>Gender: {detailedCharacter.gender}</Text>
              <Text>Origin Name: {detailedCharacter.origin?.name}</Text>
              <Text>Location Name: {detailedCharacter.location?.name}</Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}