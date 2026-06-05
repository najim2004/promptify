import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  background: '#FFFFFF',
  border: '#DCDDE6',
  muted: '#596071',
  mutedSoft: '#7B8496',
  primary: '#7047F8',
  primaryDark: '#4F22F4',
  primarySoft: '#F5F2FF',
  success: '#20B486',
  text: '#111827',
  white: '#FFFFFF',
};

type AuthInputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'name' | 'password' | 'new-password';
  icon: keyof typeof Feather.glyphMap;
  keyboardType?: 'default' | 'email-address';
  placeholder: string;
  secure?: boolean;
  textContentType?: 'emailAddress' | 'name' | 'password' | 'newPassword';
};

type AuthScaffoldProps = {
  children: React.ReactNode;
  compact?: boolean;
};

type GradientButtonProps = {
  icon?: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  title: string;
};

type AuthIllustrationVariant = 'forgot' | 'verify' | 'reset';

function AuthScaffold({ children, compact = false }: AuthScaffoldProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, compact && styles.compactScrollContent]}>
          <View style={styles.content}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function BrandHeader({ centered = false }: { centered?: boolean }) {
  return (
    <View style={[styles.brandRow, centered && styles.centerBrand]}>
      <Image
        source={require('@/assets/promptnest/logo.png')}
        style={styles.logo}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
      <Text style={styles.brandText}>PromptNest</Text>
    </View>
  );
}

function AuthInput({
  autoCapitalize = 'none',
  autoComplete,
  icon,
  keyboardType = 'default',
  placeholder,
  secure,
  textContentType,
}: AuthInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.inputBox}>
      <Feather name={icon} size={21} color="#657085" />
      <TextInput
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORS.mutedSoft}
        secureTextEntry={secure && !isVisible}
        style={styles.input}
        textContentType={textContentType}
      />

      {secure && (
        <TouchableOpacity
          accessibilityLabel={isVisible ? 'Hide password' : 'Show password'}
          activeOpacity={0.7}
          onPress={() => setIsVisible((value) => !value)}
          style={styles.passwordToggle}>
          <Feather name={isVisible ? 'eye-off' : 'eye'} size={21} color={COLORS.mutedSoft} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function GradientButton({ icon, onPress, title }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.primaryButtonShadow}>
      <LinearGradient
        colors={[COLORS.primary, '#6537F6', COLORS.primaryDark]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>{title}</Text>
        {icon && <Feather name={icon} size={22} color={COLORS.white} style={styles.buttonIcon} />}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function AuthDivider() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>or continue with</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

function SocialButton({
  compact,
  onPress,
  provider,
}: {
  compact?: boolean;
  onPress?: () => void;
  provider: 'Google' | 'Apple';
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.socialButton, compact && styles.compactSocial]}>
      <FontAwesome
        name={provider === 'Google' ? 'google' : 'apple'}
        size={20}
        color={provider === 'Google' ? '#DB4437' : COLORS.text}
      />
      <Text style={styles.socialText}>{compact ? provider : `Continue with ${provider}`}</Text>
    </TouchableOpacity>
  );
}

function AuthFooter({
  actionLabel,
  label,
  onPress,
}: {
  actionLabel: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.bottomTextRow}>
      <Text style={styles.bottomText}>{label} </Text>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.bottomLink}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

function AuthIllustration({ variant }: { variant: AuthIllustrationVariant }) {
  const config = {
    forgot: {
      icon: 'key-outline' as const,
      pill: 'Secure recovery',
      title: 'Reset link',
      detail: 'Email confirmed',
    },
    verify: {
      icon: 'mail-unread-outline' as const,
      pill: 'Verification',
      title: '4 digit code',
      detail: 'Expires in 10:00',
    },
    reset: {
      icon: 'shield-checkmark-outline' as const,
      pill: 'New password',
      title: 'Protected account',
      detail: 'Strong password ready',
    },
  }[variant];

  return (
    <View style={styles.illustrationWrap}>
      <LinearGradient
        colors={['#F6F3FF', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.illustrationCard}>
        <View style={styles.illustrationHeader}>
          <View style={styles.illustrationIcon}>
            <Ionicons name={config.icon} size={30} color={COLORS.primaryDark} />
          </View>
          <View style={styles.illustrationPill}>
            <Text style={styles.illustrationPillText}>{config.pill}</Text>
          </View>
        </View>

        <Text style={styles.illustrationTitle}>{config.title}</Text>
        <View style={styles.illustrationLineLarge} />
        <View style={styles.illustrationLineSmall} />

        <View style={styles.illustrationFooter}>
          <View style={styles.statusIcon}>
            <Feather name="check" size={14} color={COLORS.white} />
          </View>
          <Text style={styles.illustrationDetail}>{config.detail}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

export function SignInScreen({
  onForgotPassword,
  onSignIn,
  onSignUp,
}: {
  onForgotPassword?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
}) {
  return (
    <AuthScaffold>
      <View style={styles.signInTopSpacing} />
      <BrandHeader />

      <Text style={styles.largeTitle}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Sign in to access your prompts, categories, and AI tools in one place.
      </Text>

      <View style={styles.formArea}>
        <AuthInput
          autoComplete="email"
          icon="mail"
          keyboardType="email-address"
          placeholder="Email address"
          textContentType="emailAddress"
        />
        <AuthInput
          autoComplete="password"
          icon="lock"
          placeholder="Password"
          secure
          textContentType="password"
        />

        <TouchableOpacity activeOpacity={0.7} onPress={onForgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <GradientButton icon="arrow-right" title="Sign In" onPress={onSignIn} />

      <AuthDivider />

      <View style={styles.socialCompactRow}>
        <SocialButton provider="Google" compact onPress={onSignIn} />
        <SocialButton provider="Apple" compact onPress={onSignIn} />
      </View>

      <AuthFooter actionLabel="Sign Up" label="Don't have an account?" onPress={onSignUp} />
    </AuthScaffold>
  );
}

export function SignUpScreen({
  onCreateAccount,
  onSignIn,
}: {
  onCreateAccount?: () => void;
  onSignIn?: () => void;
}) {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  return (
    <AuthScaffold>
      <View style={styles.signUpTopSpacing} />
      <BrandHeader />

      <Text style={styles.largeTitle}>Create Your Account</Text>
      <Text style={styles.subtitle}>
        Join PromptNest and unlock powerful prompts across every category.
      </Text>

      <View style={styles.signUpFormArea}>
        <AuthInput
          autoCapitalize="words"
          autoComplete="name"
          icon="user"
          placeholder="Full name"
          textContentType="name"
        />
        <AuthInput
          autoComplete="email"
          icon="mail"
          keyboardType="email-address"
          placeholder="Email address"
          textContentType="emailAddress"
        />
        <AuthInput
          autoComplete="new-password"
          icon="lock"
          placeholder="Password"
          secure
          textContentType="newPassword"
        />
        <AuthInput
          autoComplete="new-password"
          icon="lock"
          placeholder="Confirm password"
          secure
          textContentType="newPassword"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setHasAcceptedTerms((value) => !value)}
        style={styles.termsRow}>
        <View style={[styles.checkbox, hasAcceptedTerms && styles.checkedBox]}>
          {hasAcceptedTerms && <Feather name="check" size={15} color={COLORS.white} />}
        </View>

        <Text style={styles.termsText}>
          I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>

      <GradientButton icon="arrow-right" title="Create Account" onPress={onCreateAccount} />

      <AuthDivider />

      <SocialButton provider="Google" onPress={onCreateAccount} />
      <View style={styles.socialSpacer} />
      <SocialButton provider="Apple" onPress={onCreateAccount} />

      <AuthFooter actionLabel="Sign In" label="Already have an account?" onPress={onSignIn} />
    </AuthScaffold>
  );
}

export function ForgotPasswordScreen({
  onBackToSignIn,
  onSendResetLink,
}: {
  onBackToSignIn?: () => void;
  onSendResetLink?: () => void;
}) {
  return (
    <AuthScaffold compact>
      <View style={styles.centerScreenTopSpacing} />
      <BrandHeader centered />
      <AuthIllustration variant="forgot" />

      <Text style={styles.centerTitle}>Forgot Password?</Text>
      <Text style={styles.centerSubtitle}>
        No worries. Enter your email and we will help you create a new password.
      </Text>

      <View style={styles.singleInputArea}>
        <AuthInput
          autoComplete="email"
          icon="mail"
          keyboardType="email-address"
          placeholder="Enter your email address"
          textContentType="emailAddress"
        />
      </View>

      <GradientButton title="Send Reset Link" onPress={onSendResetLink} />

      <TouchableOpacity activeOpacity={0.7} onPress={onBackToSignIn}>
        <Text style={styles.centerLink}>Back to Sign In</Text>
      </TouchableOpacity>
    </AuthScaffold>
  );
}

export function EmailVerificationScreen({
  email = 'your email address',
  onBack,
  onResend,
  onVerify,
}: {
  email?: string;
  onBack?: () => void;
  onResend?: () => void;
  onVerify?: (otp: string) => void;
}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const updateOtp = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <AuthScaffold compact>
      <View style={styles.centerScreenTopSpacing} />
      <BrandHeader centered />
      <AuthIllustration variant="verify" />

      <Text style={styles.centerTitle}>Verify Your Email</Text>
      <Text style={styles.centerSubtitle}>
        We sent a verification code to <Text style={styles.linkText}>{email}</Text>
      </Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => {
              inputs.current[index] = input;
            }}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) => updateOtp(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
            placeholder="0"
            placeholderTextColor="#CBD0DC"
            selectTextOnFocus
            style={styles.otpInput}
            textContentType="oneTimeCode"
            value={digit}
          />
        ))}
      </View>

      <GradientButton title="Verify Code" onPress={() => onVerify?.(otp.join(''))} />

      <TouchableOpacity activeOpacity={0.7} onPress={onResend}>
        <Text style={styles.resendText}>
          Did not receive code? <Text style={styles.linkText}>Resend</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
        <Text style={styles.centerLink}>Back</Text>
      </TouchableOpacity>
    </AuthScaffold>
  );
}

export function ResetPasswordScreen({
  onBackToSignIn,
  onResetPassword,
}: {
  onBackToSignIn?: () => void;
  onResetPassword?: () => void;
}) {
  return (
    <AuthScaffold compact>
      <View style={styles.centerScreenTopSpacing} />
      <BrandHeader centered />
      <AuthIllustration variant="reset" />

      <Text style={styles.centerTitle}>Reset Password</Text>
      <Text style={styles.centerSubtitle}>Create a new secure password for your PromptNest account.</Text>

      <View style={styles.resetFormArea}>
        <AuthInput
          autoComplete="new-password"
          icon="lock"
          placeholder="New password"
          secure
          textContentType="newPassword"
        />
        <AuthInput
          autoComplete="new-password"
          icon="lock"
          placeholder="Confirm new password"
          secure
          textContentType="newPassword"
        />
      </View>

      <GradientButton title="Reset Password" onPress={onResetPassword} />

      <TouchableOpacity activeOpacity={0.7} onPress={onBackToSignIn}>
        <Text style={styles.centerLink}>Back to Sign In</Text>
      </TouchableOpacity>
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 34,
    backgroundColor: COLORS.background,
  },
  compactScrollContent: {
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
  },
  signInTopSpacing: {
    height: 92,
  },
  signUpTopSpacing: {
    height: 42,
  },
  centerScreenTopSpacing: {
    height: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerBrand: {
    justifyContent: 'center',
  },
  logo: {
    width: 54,
    height: 54,
    marginRight: 14,
  },
  brandText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
    color: COLORS.text,
  },
  largeTitle: {
    marginTop: 42,
    fontFamily: 'Poppins_700Bold',
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 12,
    maxWidth: 400,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 26,
    color: COLORS.muted,
  },
  formArea: {
    marginTop: 46,
  },
  signUpFormArea: {
    marginTop: 26,
  },
  resetFormArea: {
    marginTop: 32,
  },
  inputBox: {
    width: '100%',
    minHeight: 62,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  passwordToggle: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    alignSelf: 'flex-end',
    marginTop: 2,
    marginBottom: 34,
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: COLORS.primaryDark,
  },
  primaryButtonShadow: {
    ...Platform.select({
      web: {
        boxShadow: '0 8px 14px rgba(112, 71, 248, 0.22)',
      },
      default: {
        shadowColor: COLORS.primary,
        shadowOpacity: 0.22,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      },
    }),
  },
  primaryButton: {
    minHeight: 62,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    color: COLORS.white,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  dividerRow: {
    marginTop: 38,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9DCE5',
  },
  dividerText: {
    marginHorizontal: 14,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#4F586A',
  },
  socialCompactRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    minHeight: 58,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  compactSocial: {
    flex: 1,
  },
  socialText: {
    marginLeft: 12,
    fontFamily: 'Poppins_500Medium',
    fontSize: 15,
    color: COLORS.text,
  },
  socialSpacer: {
    height: 12,
  },
  bottomTextRow: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  bottomText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#4F586A',
  },
  bottomLink: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: COLORS.primaryDark,
  },
  termsRow: {
    marginTop: 4,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#BDC3D1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  termsText: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.text,
  },
  linkText: {
    color: COLORS.primaryDark,
    fontFamily: 'Poppins_600SemiBold',
  },
  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 26,
  },
  illustrationCard: {
    width: '76%',
    maxWidth: 300,
    minHeight: 178,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E7E2FF',
    padding: 18,
  },
  illustrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  illustrationIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationPill: {
    borderRadius: 999,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  illustrationPillText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
    color: COLORS.primaryDark,
  },
  illustrationTitle: {
    marginTop: 20,
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: COLORS.text,
  },
  illustrationLineLarge: {
    width: '82%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E0F8',
    marginTop: 12,
  },
  illustrationLineSmall: {
    width: '58%',
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0ECFF',
    marginTop: 8,
  },
  illustrationFooter: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  illustrationDetail: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#455064',
  },
  centerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    lineHeight: 38,
    color: COLORS.text,
    textAlign: 'center',
  },
  centerSubtitle: {
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.muted,
    textAlign: 'center',
  },
  singleInputArea: {
    marginTop: 32,
    marginBottom: 12,
  },
  centerLink: {
    marginTop: 30,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  resendText: {
    marginTop: 28,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
  },
  otpRow: {
    marginTop: 34,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  otpInput: {
    width: 58,
    height: 62,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
});
