import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <Text style={styles.subtitle}>Sign in to sync your prompts and settings across devices.</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/sign-in")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In / Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 280,
  },
  button: {
    backgroundColor: "#7047F8",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 15,
  },
});
