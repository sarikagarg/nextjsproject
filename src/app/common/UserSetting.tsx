// app/components/UserSetting.tsx

'use client';

import { useEffect, useState } from "react";
import { Box, Flex, Text, Input, Button, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { setUserName, setJobTitle } from '@/app/lib/util';

interface UserSettingProps {
  buttonTitle?: string;
  onButtonClick: (isValid: boolean) => void;
  name?: string | null;
  title?: string | null;
}

export default function UserSetting({
  buttonTitle = 'Save',
  onButtonClick,
  name = '',
  title = ''
}: UserSettingProps) {
  const [userName, setUserNameState] = useState<string>(name || "");
  const [jobTitle, setJobTitleState] = useState<string>(title || "");
  const [error, setError] = useState<{ userName?: string, jobTitle?: string }>({});
  const [touched, setTouched] = useState<boolean>(false);

  const onUserNameChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameState(value);
    setTouched(true);
  }

  const onJobTitleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitleState(value);
    setTouched(true);
  }

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (validate()) {
      setUserName(userName);
      setJobTitle(jobTitle);
      onButtonClick(true);
    } else {
      setTouched(true); // Ensure that validation errors are shown if form is submitted
    }
  }

  const validate = () => {
    const newError: { userName?: string, jobTitle?: string } = {};
    if (!userName) newError.userName = 'User Name cannot be blank';
    if (!jobTitle) newError.jobTitle = 'Job Title cannot be blank';
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  useEffect(() => {
    if (touched) {
      validate();
    }
  }, [userName, jobTitle]);

  return (
    <Flex align="center" justify="center" height="auto">
      <Box p={6} boxShadow="lg">
        <FormControl isInvalid={touched && !!error.userName}>
          <Text mb={2}>Please enter your name and job title to proceed.</Text>
          <Input
            placeholder="Username"
            value={userName}
            onChange={onUserNameChange}
            mb={2}
          />
          {touched && error.userName && <FormErrorMessage mb={5}>{error.userName}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={touched && !!error.jobTitle} mt={4}>
          <Input
            placeholder="Job Title"
            value={jobTitle}
            onChange={onJobTitleChange}
            mb={2}
          />
          {touched && error.jobTitle && <FormErrorMessage mb={5}>{error.jobTitle}</FormErrorMessage>}
        </FormControl>

        <Button colorScheme="teal" onClick={onClick}>
          {buttonTitle}
        </Button>
      </Box>
    </Flex>
  )
}