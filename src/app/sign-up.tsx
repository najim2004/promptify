import { useRouter } from 'expo-router';

import { SignUpScreen } from '@/components/auth/auth-screens';

export default function SignUpRoute() {
  const router = useRouter();

  return (
    <SignUpScreen
      onCreateAccount={() => router.push('./verify-email')}
      onSignIn={() => router.replace('./sign-in')}
    />
  );
}
