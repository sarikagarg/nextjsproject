// app/components/UserDetails.tsx

'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Flex, Text, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalCloseButton } from "@chakra-ui/react";
import { isAuthenticated, getUserName, getJobTitle } from '@/app/lib/util';
import UserSetting from "./UserSetting";

export default function UserDetails() {
  const pathName = usePathname();
  const userName = getUserName();
  const jobTitle = getJobTitle();
  const [isEdit, setIsEdit] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setShowDetails(true);
    }
  }, [pathName]);

  const onEdit = () => {
    setIsEdit(true);
  }

  const onClose = () => {
    setIsEdit(false);
  };

  const onSave = (isValid: Boolean) => {
    if (isValid) {
      onClose();
    }
  };

  return showDetails ? (
    <><Box textAlign="right">
      <Text>User: {userName}</Text>
      <Text>Title: {jobTitle}</Text>
      <Button colorScheme="whiteAlpha" size="sm" mt={2} onClick={onEdit}>
        Edit Info
      </Button>
    </Box>
      {isEdit &&
        <Modal isOpen={isEdit} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserSetting buttonTitle="Submit" onButtonClick={onSave} name={userName} title={jobTitle} />
            </ModalBody>
          </ModalContent>
        </Modal>}</>
  ) : null
}