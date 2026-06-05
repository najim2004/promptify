import { useRouter } from 'expo-router';

import { ResetPasswordScreen } from '@/components/auth/auth-screens';

export default function ResetPasswordRoute() {
  const router = useRouter();

  return (
    <ResetPasswordScreen
      onBackToSignIn={() => router.replace('./sign-in')}
      onResetPassword={() => router.replace('./sign-in')}
    />
  );
}
