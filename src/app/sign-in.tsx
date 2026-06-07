import { useRouter } from 'expo-router';

import { SignInScreen } from '@/components/auth/auth-screens';

export default function SignInRoute() {
  const router = useRouter();

  return (
    <SignInScreen
      onForgotPassword={() => router.push('./forgot-password')}
      onSignIn={() => router.replace('/' as any)}
      onSignUp={() => router.push('./sign-up')}
    />
  );
}
