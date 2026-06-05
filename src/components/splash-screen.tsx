import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type Props = {
  onFinish?: () => void;
  duration?: number;
};

export default function PromptNestSplash({ onFinish, duration = 1200 }: Props) {
  const [rotateValue] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
    );

    animation.start();

    const timer = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => {
      animation.stop();
      clearTimeout(timer);
    };
  }, [duration, onFinish, rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#06061F" />

      <LinearGradient
        colors={["#070623", "#130947", "#080522", "#020314"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <CircleDot top={height * 0.28} left={width * 0.68} size={3} />
      <CircleDot top={height * 0.36} left={width * 0.74} size={2} />
      <CircleDot top={height * 0.4} left={width * 0.31} size={3} />
      <CircleDot top={height * 0.31} left={width * 0.61} size={2} />
      <CircleDot top={height * 0.34} left={width * 0.7} size={1.5} />

      <View style={styles.content}>
        <Image
          source={require("@/assets/images/logo/logo.png")}
          style={styles.logoImage}
          contentFit="contain"
          cachePolicy="memory-disk"
        />

        <Text style={styles.title}>Promptify</Text>

        <Text style={styles.subtitle}>
          Discover amazing AI prompts{"\n"}that spark your creativity.
        </Text>
      </View>

      <Animated.View style={[styles.loader, { transform: [{ rotate }] }]}>
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (index * 360) / 8;
          const radius = 20;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          const colors = [
            "#B963FF",
            "#A24CFF",
            "#8A3CFF",
            "#7131F0",
            "#5F2DCE",
            "#5530BB",
            "#6F35DD",
            "#9850FF",
          ];

          return (
            <View
              key={index}
              style={[
                styles.loaderDot,
                {
                  backgroundColor: colors[index],
                  left: 25 + x,
                  top: 25 + y,
                  opacity: 1 - index * 0.07,
                },
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}

function CircleDot({
  top,
  left,
  size,
}: {
  top: number;
  left: number;
  size: number;
}) {
  return (
    <View
      style={[
        styles.star,
        {
          top,
          left,
          width: size,
          height: size,
          borderRadius: size,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#05051E",
    alignItems: "center",
  },

  logoImage: {
    width: 160,
    height: 140,
    shadowColor: "#AA52FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 24,
  },

  star: {
    position: "absolute",
    backgroundColor: "#C76CFF",
    shadowColor: "#C76CFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },

  content: {
    position: "absolute",
    top: height * 0.275,
    width: "100%",
    alignItems: "center",
  },

  title: {
    marginTop: 42,
    fontFamily: "Montserrat_700Bold",
    fontSize: 42,
    lineHeight: 52,
    letterSpacing: 0.5,
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 22,
    fontFamily: "Montserrat_400Regular",
    fontSize: 19,
    lineHeight: 34,
    letterSpacing: 0.45,
    color: "#E6E2F4",
    textAlign: "center",
  },

  loader: {
    position: "absolute",
    top: height * 0.72,
    width: 60,
    height: 60,
  },

  loaderDot: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 11,
  },
});
