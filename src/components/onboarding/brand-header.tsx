import React from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type BrandHeaderProps = {
  showLogo?: boolean;
  showSkip?: boolean;
  onSkip?: () => void;
  brandText?: string;
};

export function BrandHeader({
  showLogo,
  showSkip,
  onSkip,
  brandText = "Promptify",
}: BrandHeaderProps) {
  return (
    <View style={styles.header}>
      {showLogo ? (
        <View style={styles.brandRow}>
          <Image
            source={require("@/assets/images/logo/logo.png")}
            style={styles.brandLogo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
          <Text style={styles.brandText}>{brandText}</Text>
        </View>
      ) : (
        <View />
      )}

      {showSkip && (
        <TouchableOpacity activeOpacity={0.7} onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 74,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skipText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#4D5260",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  brandLogo: {
    width: 42,
    height: 42,
  },
  brandText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#151923",
    letterSpacing: 0.2,
  },
});
