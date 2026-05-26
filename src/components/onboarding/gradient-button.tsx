import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientButtonProps = {
  text: string;
  onPress: () => void;
};

export function GradientButton({ text, onPress }: GradientButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <LinearGradient
        colors={["#7047F8", "#6E35F4", "#6331F2"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
  },
  button: {
    height: 70,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 22,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
