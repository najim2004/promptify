import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  Polygon,
  Stop,
  LinearGradient as SvgLinearGradient,
} from "react-native-svg";

const { width, height } = Dimensions.get("window");

type Props = {
  onFinish?: () => void;
  duration?: number;
};

export default function PromptNestSplash({ onFinish, duration = 2600 }: Props) {
  const rotateValue = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  // useEffect(() => {
  //   const animation = Animated.loop(
  //     Animated.timing(rotateValue, {
  //       toValue: 1,
  //       duration: 1100,
  //       useNativeDriver: true,
  //     }),
  //   );

  //   animation.start();

  //   const timer = setTimeout(() => {
  //     onFinish?.();
  //   }, duration);

  //   return () => {
  //     animation.stop();
  //     clearTimeout(timer);
  //   };
  // }, [duration, onFinish, rotateValue]);

  if (!fontsLoaded) return null;

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
          source={require("@/assets/images/logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
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

function PromptNestLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Svg width={150} height={130} viewBox="0 0 180 150">
        <Defs>
          <SvgLinearGradient id="hexGradient" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#C867FF" />
            <Stop offset="0.45" stopColor="#7D3BFF" />
            <Stop offset="1" stopColor="#4B2DEB" />
          </SvgLinearGradient>

          <SvgLinearGradient id="facetOne" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.02" />
          </SvgLinearGradient>

          <SvgLinearGradient id="facetTwo" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#2E14B8" stopOpacity="0.15" />
            <Stop offset="1" stopColor="#09002D" stopOpacity="0.35" />
          </SvgLinearGradient>
        </Defs>

        <Polygon
          points="90 6 166 45 166 105 90 144 14 105 14 45"
          fill="url(#hexGradient)"
          stroke="#C56CFF"
          strokeWidth="3"
          opacity="0.96"
        />

        <Polygon
          points="90 6 166 45 90 76 14 45"
          fill="url(#facetOne)"
          opacity="0.55"
        />

        <Polygon
          points="14 45 90 76 90 144 14 105"
          fill="#3519DB"
          opacity="0.35"
        />

        <Polygon
          points="166 45 90 76 90 144 166 105"
          fill="url(#facetTwo)"
          opacity="0.45"
        />

        <Circle cx="90" cy="76" r="57" fill="#8F45FF" opacity="0.12" />

        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M66 112V64C66 43 82.5 29 103 29C127 29 145 47 145 70C145 94 126.5 111 102 111C91.5 111 82.5 107.5 76 101.5V112H66ZM102.5 90C114.5 90 123.5 81 123.5 70C123.5 59 114.5 50 102.5 50C90.5 50 81.5 59 81.5 70C81.5 81 90.5 90 102.5 90Z"
          fill="#FFFFFF"
        />
      </Svg>
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

  topGlow: {
    position: "absolute",
    top: -120,
    width: width * 0.95,
    height: width * 0.95,
    borderRadius: width,
    backgroundColor: "#3421B522",
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

  logoWrapper: {
    width: 150,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#AA52FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 24,
    elevation: 22,
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
