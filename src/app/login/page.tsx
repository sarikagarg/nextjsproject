'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { isAuthenticated } from '@/app/lib/util';
import UserSetting from '../common/UserSetting';

export default function Login() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const router = useRouter();

  const onSave = (isValid: boolean) => {
    if (isValid) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/welcome');
    }
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setShowDetails(true);
      router.push('/welcome');
    }
  });

  return !showDetails ?
    <UserSetting buttonTitle="Submit" onButtonClick={onSave} name='' title='' /> : <div>Loading...</div>;
};