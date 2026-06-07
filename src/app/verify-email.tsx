import { useLocalSearchParams, useRouter } from 'expo-router';

import { EmailVerificationScreen } from '@/components/auth/auth-screens';

export default function VerifyEmailRoute() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  return (
    <EmailVerificationScreen
      email={params.email ?? 'your email address'}
      onBack={() => router.back()}
      onResend={() => undefined}
      onVerify={() => router.replace('/' as any)}
    />
  );
}
