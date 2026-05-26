import React from "react";
import { StyleSheet, View } from "react-native";

type DotIndicatorProps = {
  count: number;
  activeIndex: number;
};

export function DotIndicator({ count, activeIndex }: DotIndicatorProps) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: count }).map((_, dotIndex) => (
        <View
          key={dotIndex}
          style={[
            styles.dot,
            activeIndex === dotIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    marginBottom: 54,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: "#DADDE8",
  },
  activeDot: {
    backgroundColor: "#7047F8",
  },
});
