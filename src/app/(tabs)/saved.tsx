import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Saved Prompts</Text>
      <Text style={styles.subtitle}>Your bookmarked prompts will appear here.</Text>
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
  },
});
