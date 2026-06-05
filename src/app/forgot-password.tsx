import { useRouter } from 'expo-router';

import { ForgotPasswordScreen } from '@/components/auth/auth-screens';

export default function ForgotPasswordRoute() {
  const router = useRouter();

  return (
    <ForgotPasswordScreen
      onBackToSignIn={() => router.replace('./sign-in')}
      onSendResetLink={() => router.push('./reset-password')}
    />
  );
}
